import '../../../../pages/base.css';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserSide from '../../../UserSide';

function Addnumber() {
  return (
    <div className="add__page">
      <div className="header">
        <div className="page__rank">
          <div className="header__fa">Cấp số</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__fa">Danh sách cấp số</div>
          <FontAwesomeIcon className="page__rank-icon" icon={faAngleRight} />
          <div className="header__title">Cấp số mới</div>
        </div>
        <UserSide />
      </div>

      <div className="content">
        <div className="content__heading">Quản lý cấp số</div>
      </div>
    </div>
  );
}

export default Addnumber;
