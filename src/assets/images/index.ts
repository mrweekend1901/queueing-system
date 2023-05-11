import Logo from './Logo alta.svg';
import IconDashBoard from './element-4.svg';
import IconSetting from './setting.svg';
import IconDevice from './monitor.svg';
import IconNumber from './icon dasboard03.svg';
import IconService from './service.svg';
import IconReport from './Frame.svg';
import ThreeDos from './fi_more-vertical.svg';
import Bell from './bell.svg';
import Avatar from './avatar.png';
import Avatar2 from './avatar_big.png';

type ImagesType = Record<string, string>;

const images: ImagesType = {
  logo: Logo,
  dashboard: IconDashBoard,
  setting: IconSetting,
  number: IconNumber,
  device: IconDevice,
  service: IconService,
  report: IconReport,
  threedos: ThreeDos,
  bell: Bell,
  avatar: Avatar,
  avatar2: Avatar2,
};

export default images;
