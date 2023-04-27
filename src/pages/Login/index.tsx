import './login.css';
import formlogo from '../../assets/images/form__logo.png';
import loginimg from '../../assets/images/login__img.png';

function Login() {
  return (
    <main className="login-page">
      <div className="form-side">
        <img src={formlogo} alt="form-logo" className="form-logo" />
        <form action="" method="POST" className="form" id="form-1">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Tên đăng nhập *
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Nhập tên đăng nhập..."
              className="form-control"
            />
            <span className="form__message"></span>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Mật khẩu *
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Nhập mật khẩu..."
              className="form-control"
            />
            <span className="form-message"></span>
          </div>

          <a href="/" className="miss-password">
            Quên mật khẩu?
          </a>

          <button className="btn form-submit">Đăng nhập</button>
        </form>
      </div>
      <div className="picture-side">
        <img src={loginimg} alt="login-img" className="login-img" />
        <span className="app-name">
          <p className="text1">Hệ thống</p>
          <p className="text2">QUẢN LÝ XẾP HÀNG</p>
        </span>
      </div>
    </main>
  );
}

export default Login;
