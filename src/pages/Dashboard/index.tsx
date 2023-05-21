import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../base.css';
import './dashboard.css';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
  return (
    <div className="dashboard__page">
      <div className="header">
        <div className="page__rank">
          <div className="header__fa">Dashboard</div>
        </div>
      </div>

      <div className="content">
        <div className="content__heading">Biểu đồ cấp số</div>
        <div className="content__chart-wrapper">
          <div className="popup-group">
            <div className="popup-item">
              <div className="popup-item-top">
                <span className="popup-item-border-icon background-icon1">
                  <FontAwesomeIcon className="popup-item-icon icon1" icon={faCalendar} />
                </span>
                <span className="popup-item-name">Số thứ tự đã cấp</span>
              </div>
              <div className="popup-item-bot">
                <p className="popup-item-number">4.221</p>
                <span className="popup-percent background-percent1 percent1">
                  <FontAwesomeIcon className="popup-percent-icon" icon={faArrowUp} />
                  <p className="popup-number-percent">32,41%</p>
                </span>
              </div>
            </div>
            <div className="popup-item">
              <div className="popup-item-top">
                <span className="popup-item-border-icon background-icon2">
                  <FontAwesomeIcon className="popup-item-icon icon2" icon={faCalendar} />
                </span>
                <p className="popup-item-name">Số thứ tự đã sử dụng</p>
              </div>
              <div className="popup-item-bot">
                <p className="popup-item-number">3.721</p>
                <span className="popup-percent background-percent2 percent2">
                  <FontAwesomeIcon className="popup-percent-icon" icon={faArrowDown} />
                  <p className="popup-number-percent">32,41%</p>
                </span>
              </div>
            </div>
            <div className="popup-item">
              <div className="popup-item-top">
                <span className="popup-item-border-icon background-icon3">
                  <FontAwesomeIcon className="popup-item-icon icon3" icon={faCalendar} />
                </span>
                <p className="popup-item-name">Số thứ tự đang chờ</p>
              </div>
              <div className="popup-item-bot">
                <p className="popup-item-number">468</p>
                <span className="popup-percent background-percent1 percent1">
                  <FontAwesomeIcon className="popup-percent-icon" icon={faArrowUp} />
                  <p className="popup-number-percent">56,41%</p>
                </span>
              </div>
            </div>
            <div className="popup-item">
              <div className="popup-item-top">
                <span className="popup-item-border-icon background-icon4">
                  <FontAwesomeIcon className="popup-item-icon icon4" icon={faCalendar} />
                </span>
                <p className="popup-item-name">Số thứ tự đã bỏ qua</p>
              </div>
              <div className="popup-item-bot">
                <p className="popup-item-number">32</p>
                <span className="popup-percent background-percent2 percent2">
                  <FontAwesomeIcon className="popup-percent-icon" icon={faArrowDown} />
                  <p className="popup-number-percent">22,41%</p>
                </span>
              </div>
            </div>
          </div>
          <div className="chart"></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
