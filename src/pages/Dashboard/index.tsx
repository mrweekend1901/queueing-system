import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../base.css';
import './dashboard.css';
import { faCalendar, faComments } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowDown,
  faArrowUp,
  faCircle,
  faDisplay,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';
import LineChart from '../../components/LineChart';
import DropDown from '../../components/Dropdown';
import { useState } from 'react';
import UserSide from '../../components/UserSide';
import Calendar from '../../components/Calendar';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const dropdownList = ['Ngày', 'Tháng'];

const Dashboard: React.FC = () => {
  const [filter, setFilter] = useState({
    date: 'Tháng',
  });

  const handleDropdownSelect = (selectedOption: string, kind: string) => {
    setFilter({ ...filter, [kind]: selectedOption });
  };

  const commonStyles = {
    pathColor: `rgba(255, 117, 6, 1)`,
    textColor: '#f88',
    trailColor: '#d6d6d6',
    pathTransitionDuration: 0.5,
  };

  const styles = buildStyles(commonStyles);

  const styles2 = buildStyles({
    ...commonStyles,
    pathColor: `rgba(126, 125, 136, 1)`,
    textColor: '#535261',
    textSize: '24px',
  });

  const styles3 = buildStyles({
    ...commonStyles,
    pathColor: `rgba(66, 119, 255, 1)`,
  });

  const styles4 = buildStyles({
    ...commonStyles,
    pathColor: `rgba(53, 199, 90, 1)`,
  });

  const styles5 = buildStyles({
    ...commonStyles,
    pathColor: `rgba(241, 120, 182, 1)`,
    textColor: '#535261',
    textSize: '30px',
  });

  return (
    <span className="space__dashboard">
      <div className="dashboard__page">
        <div className="header">
          <div className="page__rank">
            <div className="header__fa">Dashboard</div>
          </div>
        </div>

        <div className="content" style={{ marginTop: '55px' }}>
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
            <div className="chart">
              <div className="chart__heading">
                <div className="chart__name-group">
                  <p className="chart__name">Bảng thống kê theo tháng</p>
                  <p className="chart__date">Tháng 11/2023</p>
                </div>
                <div className="chart__drop-group">
                  <p className="chart__text">Xem theo</p>
                  <DropDown
                    id="dropdownChart"
                    placeholder="Tháng"
                    dropdownWidth="106px"
                    dropdownHeight="44px"
                    options={dropdownList}
                    onSelect={selectedOption => handleDropdownSelect(selectedOption, 'date')}
                  />
                </div>
              </div>
              <LineChart />
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard__rightbar">
        <span className="user">
          <UserSide />
        </span>
        <div className="overview">
          <h2 className="overview__head">Tổng quan</h2>
          <span className="overview__body">
            <span className="overview__item">
              <div className="overview__item-chart">
                <CircularProgressbar className="item-chart" value={90} styles={styles} />

                <CircularProgressbar
                  className="item-chart2"
                  value={10}
                  text={`${90}%`}
                  styles={styles2}
                />
              </div>
              <div className="overview__item-number-group">
                <p className="overview__item-number">4.221</p>
                <span className="overview__item-name-group" style={{ color: '#FF7506' }}>
                  <FontAwesomeIcon className="overview__item-icon" icon={faDisplay} />
                  <p className="overview__item-name">Thiết bị</p>
                </span>
              </div>
              <div className="overview__item-status-group">
                <div className="overview__item-status">
                  <FontAwesomeIcon
                    className="overview__item-status-icon"
                    icon={faCircle}
                    color="#FFD130"
                  />
                  <p className="overview__item-status-name">Đang hoạt động</p>
                  <p className="overview__item-status-number" style={{ color: '#FF7506' }}>
                    3.799
                  </p>
                </div>
                <div className="overview__item-status">
                  <FontAwesomeIcon
                    className="overview__item-status-icon"
                    icon={faCircle}
                    color="#7E7D88"
                  />
                  <p className="overview__item-status-name">Ngưng hoạt động</p>
                  <p className="overview__item-status-number" style={{ color: '#FF7506' }}>
                    422
                  </p>
                </div>
              </div>
            </span>
            <span className="overview__item">
              <div className="overview__item-chart">
                <CircularProgressbar className="item-chart" value={76} styles={styles3} />

                <CircularProgressbar
                  className="item-chart2"
                  value={24}
                  text={`${76}%`}
                  styles={styles2}
                />
              </div>
              <div className="overview__item-number-group">
                <p className="overview__item-number">276</p>
                <span className="overview__item-name-group" style={{ color: '#4277FF' }}>
                  <FontAwesomeIcon className="overview__item-icon" icon={faComments} />
                  <p className="overview__item-name">Dịch vụ</p>
                </span>
              </div>
              <div className="overview__item-status-group">
                <div className="overview__item-status">
                  <FontAwesomeIcon
                    className="overview__item-status-icon"
                    icon={faCircle}
                    color="#4277FF"
                  />
                  <p className="overview__item-status-name">Đang hoạt động</p>
                  <p className="overview__item-status-number" style={{ color: '#4277FF' }}>
                    210
                  </p>
                </div>
                <div className="overview__item-status">
                  <FontAwesomeIcon
                    className="overview__item-status-icon"
                    icon={faCircle}
                    color="#7E7D88"
                  />
                  <p className="overview__item-status-name">Ngưng hoạt động</p>
                  <p className="overview__item-status-number" style={{ color: '#4277FF' }}>
                    66
                  </p>
                </div>
              </div>
            </span>
            <span className="overview__item">
              <div className="overview__item-chart">
                <CircularProgressbar className="item-chart" value={86} styles={styles4} />

                <CircularProgressbar className="item-chart2" value={10} styles={styles2} />

                <CircularProgressbar
                  className="item-chart3"
                  value={4}
                  text={`${86}%`}
                  styles={styles5}
                />
              </div>
              <div className="overview__item-number-group">
                <p className="overview__item-number">4.221</p>
                <span className="overview__item-name-group" style={{ color: '#35C75A' }}>
                  <FontAwesomeIcon className="overview__item-icon" icon={faLayerGroup} />
                  <p className="overview__item-name">Cấp số</p>
                </span>
              </div>
              <div className="overview__item-status-group">
                <div className="overview__item-status">
                  <FontAwesomeIcon
                    className="overview__item-status-icon"
                    icon={faCircle}
                    color="#35C75A"
                  />
                  <p className="overview__item-status-name">Đã sử dụng</p>
                  <p className="overview__item-status-number" style={{ color: '#35C75A' }}>
                    3.721
                  </p>
                </div>
                <div className="overview__item-status">
                  <FontAwesomeIcon
                    className="overview__item-status-icon"
                    icon={faCircle}
                    color="#7E7D88"
                  />
                  <p className="overview__item-status-name">Đang chờ</p>
                  <p className="overview__item-status-number" style={{ color: '#35C75A' }}>
                    486
                  </p>
                </div>
                <div className="overview__item-status">
                  <FontAwesomeIcon
                    className="overview__item-status-icon"
                    icon={faCircle}
                    color="#F178B6"
                  />
                  <p className="overview__item-status-name">Bỏ qua</p>
                  <p className="overview__item-status-number" style={{ color: '#35C75A' }}>
                    32
                  </p>
                </div>
              </div>
            </span>
          </span>
        </div>
        <span className="calendar__right">
          <Calendar />
        </span>
      </div>
    </span>
  );
};

export default Dashboard;
