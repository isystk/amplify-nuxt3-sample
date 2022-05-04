import Header from '@/components/Header';
import {storiesOf} from "@storybook/vue3";

storiesOf('commons/Header', module)
    .add('default', () => ({
      components: { Header },
      template: `
    <div>
      <Header />
    </div>
  `
    }))