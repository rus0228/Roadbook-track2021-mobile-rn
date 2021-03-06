import Config from '@/config/DebugConfig';
import Reactotron from 'reactotron-react-native';

const reactotron = Reactotron.configure({name: 'Ignite App'}).useReactNative();

if (Config.useReactotron) {
  // https://github.com/infinitered/reactotron for more options!

  reactotron.connect();

  // Let's clear Reactotron on every time we load the app
  reactotron.clear();

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
}
export default reactotron;
console.tron = reactotron;
