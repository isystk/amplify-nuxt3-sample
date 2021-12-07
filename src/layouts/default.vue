<template>
  <Header />
  <div class="contents">
    <div class="wrapper">
      <div id="pc-menu">
        <div className="wrapper">
          <nav>
            <ul>
              <li>
                <NuxtLink :to="$C.URL.HOME">HOME</NuxtLink>
              </li>
              <li>
                <NuxtLink :to="$C.URL.MEMBER">マイページ</NuxtLink>
              </li>
              <li>
                <NuxtLink :to="$C.URL.LOGIN">ログイン</NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <slot />
    </div>
  </div>
  <Footer />
</template>
