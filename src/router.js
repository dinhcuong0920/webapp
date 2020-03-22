import ChooseFile from "./components/ChooseFile";
import TakePicture from "./components/TakePicture";
import Home from "./components/Home";

const routes = [
    { path: '/', component: Home },
    { path: '/choosefile', component: ChooseFile },
    { path: '/takepicture', component: TakePicture },
];
export default routes;