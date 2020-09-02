import Reactotron, { networking, trackGlobalErrors } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
const reactotron = Reactotron
    .configure({ host: '192.168.1.11' })
    .use(reactotronRedux())
    .use(trackGlobalErrors())
    .use(networking())
    .connect();
export { reactotron };