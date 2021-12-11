<template>
  <div v-if="drop">
    <div
      id="drop-zone"
      :class="[isHover ? 'hover' : '']"
      @dragover="handleDragEnter"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <p>{{ dropText }}</p>
      <input
        :id="id"
        type="file"
        :accept="accept"
        :capture="capture"
        :multiple="multiple"
        @change="handleFileChange"
      />
    </div>
  </div>
  <div v-else>
    <input
      :id="id"
      type="file"
      :accept="accept"
      :capture="capture"
      :multiple="multiple"
      @change="handleFileChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    maxFileSize: {
      type: Number,
      require: false,
      default: 10485760,
    },
    thumbnailSize: {
      type: Number,
      require: false,
      default: 500,
    },
    drop: {
      type: Boolean,
      require: false,
      default: false,
    },
    dropText: {
      type: String,
      require: false,
      default: 'image drop here !!',
    },
    id: {
      type: String,
      require: false,
      default: 'js-image-base64',
    },
    accept: {
      type: String,
      require: false,
      default: 'image/*',
    },
    capture: {
      type: String,
      require: false,
      default: undefined,
    },
    multiple: {
      type: Boolean,
      require: false,
      default: undefined,
    },
  },
  data() {
    return {
      isHover: false,
    }
  },
  methods: {
    // ファイル選択時のハンドラー
    handleFileChange: function (e) {
      const self = this
      for (let file of e.target.files) {
        const ext = this.getExt(file.name).toLowerCase()
        if (ext === 'heic') {
          // HEIC対応 iphone11 以降で撮影された画像にも対応する
          // console.log('HEIC形式の画像なのでJPEGに変換します。')
          const heic2any = require('heic2any')
          if (typeof window !== 'undefined') {
            fetch('https://alexcorvi.github.io/heic2any/demo/14.heic')
              .then((res) => res.blob())
              .then((blob) =>
                heic2any({
                  blob,
                  toType: 'image/jpeg',
                  quality: 1,
                }).then(function (rb) {
                  const resultBlob = rb
                  const errors = self.validate(resultBlob)
                  if (0 < errors.length) {
                    self.errorCallback(errors)
                    return
                  }
                  self.resize(
                    file.name,
                    resultBlob,
                    function (res) {
                      res.fileName = file.name
                      self.successCallback(
                        Object.assign(Object.assign({}, res), {
                          result: true,
                          messages: ['正常終了'],
                        })
                      )
                    },
                    function (errors) {
                      self.errorCallback(errors)
                      return
                    }
                  )
                })
              )
          }
        } else {
          const errors = self.validate(file)
          if (0 < errors.length) {
            this.errorCallback(errors)
            return
          }
          self.resize(
            file.name,
            file,
            function (res) {
              self.successCallback({
                ...res,
                result: true,
                messages: ['正常終了'],
              })
            },
            function (errors) {
              self.errorCallback(errors)
              return
            }
          )
        }
      }
    },
    getExt: function (filename) {
      const pos = filename.lastIndexOf('.')
      if (pos === -1) return ''
      return filename.slice(pos + 1)
    },
    // 入力チェック
    validate: function (blob) {
      const errors = []
      // ファイルサイズチェック
      if (this.maxFileSize < blob.size) {
        errors.push(
          '画像ファイルのファイルサイズが最大値(' +
            Math.floor(this.maxFileSize / 1000000) +
            'MB)を超えています。'
        )
      }
      return errors
    },
    errorCallback: function (values) {
      this.$emit('handleChange', { result: false, messages: values })
    },
    successCallback: function (values) {
      this.$emit('handleChange', { ...values })
    },
    // 画像のリサイズ
    resize: function (fileName, blob, callback) {
      const self = this
      const image = new Image()
      const fr = new FileReader()
      fr.onload = function (evt) {
        // リサイズする
        image.onload = function () {
          let width, height
          if (image.width > image.height) {
            // 横長の画像は横のサイズを指定値にあわせる
            const ratio = image.height / image.width
            width = self.thumbnailSize
            height = self.thumbnailSize * ratio
          } else {
            // 縦長の画像は縦のサイズを指定値にあわせる
            const ratio = image.width / image.height
            width = self.thumbnailSize * ratio
            height = self.thumbnailSize
          }
          // サムネ描画用canvasのサイズを上で算出した値に変更
          const canvas = document.createElement('canvas')
          canvas.id = 'canvas'
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          if (ctx) {
            // canvasに既に描画されている画像をクリア
            ctx.clearRect(0, 0, width, height)
            // canvasにサムネイルを描画
            ctx.drawImage(
              image,
              0,
              0,
              image.width,
              image.height,
              0,
              0,
              width,
              height
            )
          }
          // canvasからbase64画像データを取得
          const base64 = canvas.toDataURL('image/jpeg')
          // base64からBlobデータを作成
          const bin = atob(base64.split('base64,')[1])
          const len = bin.length
          const barr = new Uint8Array(len)
          let i = 0
          while (i < len) {
            barr[i] = bin.charCodeAt(i)
            i++
          }
          const resizeBlob = new Blob([barr], { type: 'image/jpeg' })
          callback({
            fileName: fileName,
            ofileData: evt.target ? evt.target.result : null,
            fileData: base64,
            ofileSize: blob.size,
            fileSize: resizeBlob.size,
            fileType: resizeBlob.type,
          })
        }
        image.onerror = function () {
          this.errorCallback(['選択されたファイルをロードできません。'])
        }
        image.src = evt.target ? evt.target.result + '' : ''
      }
      fr.readAsDataURL(blob)
    },
    handleDragEnter: function (e) {
      e.preventDefault()
      e.stopPropagation()
      this.setIsHover(true)
    },
    handleDragLeave: function (e) {
      e.preventDefault()
      e.stopPropagation()
      this.setIsHover(false)
    },
    handleDragOver: function (e) {
      e.preventDefault()
      e.stopPropagation()
    },
    handleDrop: function (e) {
      e.preventDefault()
      e.stopPropagation()
      this.setIsHover(false)
      var files = e.dataTransfer.files
      if (files.length === 0) {
        return
      }
      this.handleFileChange({ target: { files } })
    },
    setIsHover: function (isHover) {
      this.isHover = isHover
    },
  },
}
</script>
