import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import authService from '../services/authService';
import { Sms, Lock } from 'iconsax-react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setToken, setRefreshToken, setUser } = useAuthStore();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormInvalid = !validateEmail(email) || !password || isLoading;

  const handleLogin = async (e) => {
    e.preventDefault();
    let hasError = false;

    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email (xxx@yyy.zzz)');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    }

    if (hasError) return;
    setIsLoading(true);

    try {
      const loginResponse = await authService.login(email, password);
      setToken(loginResponse.token);
      setRefreshToken(loginResponse.refresh);
      // Persist in localStorage (fallback)
      localStorage.setItem('token', loginResponse.token);
      localStorage.setItem('refreshToken', loginResponse.refresh);
      // Persist token in cookie (client-side; not HttpOnly)
      const maxAgeSeconds = 60 * 60 * 24; // 1 day
      document.cookie = `token=${encodeURIComponent(loginResponse.token)}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax`;

      // Save user info directly from response
      setUser(loginResponse.userInfo);
      localStorage.setItem('user', JSON.stringify(loginResponse.userInfo));
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Use fixed positioning and inset-0 so this container reliably fills the viewport
    // (avoids issues with 100vh/100vw on some platforms and ensures absolute children
    // are positioned relative to this element).
    <div className="fixed w-screen h-screen inset-0 flex bg-[#E9ECF2] overflow-hidden">
      {/* Ellipse Background */}
      <div
          className="absolute"
          style={{
            width: "667px",
            height: "667px",
            backgroundColor: "rgba(228, 119, 246, 1)",
            opacity: 1,
            top: "-327px",
            left: "633px",
            position: "absolute",
            borderRadius: "50%",
            filter: "blur(200px)", 
            zIndex: 0
          }}
        />

        {/* Second Ellipse Background */}
        <div
          className="absolute"
          style={{
            width: "667px",
            height: "667px",
            opacity: 1,
            left: "1073px",
            top: "667px",
            backgroundColor: "rgba(158, 119, 246, 1)",
            position: "absolute",
            borderRadius: "50%",
            filter: "blur(200px)",
            zIndex: 0
          }}
        />

        {/* Third Ellipse Background */}
        <div
          className="absolute"
          style={{
            width: "813px",
            height: "813px",
            top: "646px",
            left: "-117px",
            opacity: 0.6,
            backgroundColor: "rgba(176, 210, 229, 1)",
            position: "absolute",
            borderRadius: "50%",
            filter: "blur(200px)",
            zIndex: 0
          }}
        />

        {/* Fourth Ellipse Background */}
        <div
          className="absolute"
          style={{
            width: "807px",
            height: "807px",
            top: "-372px",
            left: "38px",
            opacity: 0.6,
            backgroundColor: "rgba(158, 119, 246, 1)",
            position: "absolute",
            borderRadius: "50%",
            filter: "blur(500px)",
            zIndex: 0
          }}
        />

      {/* Left Section - Login Form */}
      <div className="flex justify-center items-center col-span-6">
        {/* Inner Content Container */}
        <div
          style={{
            width: '381px',
            opacity: 1,
            marginLeft: '80px',
            zIndex: 1,
          }}
        >
          {/* Text Section */}
          <div
            className="flex flex-col"
            style={{
              width: '100%',
              maxWidth: '381px',
              gap: 'clamp(6px, 0.56vw, 8px)',
              opacity: 1,
              marginBottom: '20px',
            }}
          >
            {/* Welcome back Heading */}
            <h1
              style={{
                width: '100%',
                // height: 'auto',
                // minHeight: '66px',
                fontFamily: 'ABeeZee, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: 'clamp(32px, 3.89vw, 56px)',
                // lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#1A1A1E',
                opacity: 1,
                margin: 0,
                padding: 0
              }}
            >
              Welcome back
            </h1>

            {/* Paragraph Text */}
            <p
              style={{
                width: '100%',
                maxWidth: '381px',
                height: 'auto',
                minHeight: '56px',
                fontFamily: 'ABeeZee, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: 'clamp(14px, 1.25vw, 18px)',
                lineHeight: '155%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#62626B',
                opacity: 1,
                margin: 0,
                padding: 0
              }}
            >
              Step into our shopping metaverse for an unforgettable shopping experience
            </p>
          </div>

          {/* Form Section */}
          <div
            className="flex flex-col"
            style={{
              width: '100%',
              maxWidth: '381px',
              height: 'auto',
              minHeight: '134px',
              gap: 'clamp(16px, 1.39vw, 20px)',
              opacity: 1,
              marginTop: '40px'
            }}
          >
            <form
              onSubmit={handleLogin}
              className="flex flex-col w-full"
              style={{
                gap: '20px'
              }}
            >
              {/* Email Input */}
              <div className="relative w-full" style={{ height: 'clamp(48px, 3.96vw, 57px)' }}>
                <div
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{
                    zIndex: 1,
                    marginLeft: '10px',
                  }}
                >
                  <Sms size="20" color="#62626B" variant="Outline" />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  style={{
                    width: '-webkit-fill-available',
                    borderRadius: '8px',
                    borderWidth: '1px',
                    borderColor: '#FFFFFF',
                    borderStyle: 'solid',
                    padding: 'clamp(12px, 1.11vw, 16px)',
                    paddingLeft: 'clamp(40px, 3.33vw, 48px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    fontFamily: 'ABeeZee, sans-serif',
                    fontWeight: 400,
                    fontStyle: 'normal',
                    fontSize: 'clamp(14px, 1.11vw, 16px)',
                    // lineHeight: '155%',
                    letterSpacing: '0%',
                    color: '#62626B',
                    opacity: 1,
                    outline: 'none'
                  }}
                  className="focus:ring-2 focus:ring-[#9414FF] placeholder:text-[#62626B]"
                />
              </div>

              {/* Password Input */}
              <div className="relative w-full" style={{ height: 'clamp(48px, 3.96vw, 57px)' }}>
                <div
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{
                    zIndex: 1,
                    marginLeft: '10px',
                  }}
                >
                  <Lock size="20" color="#62626B" variant="Outline" />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError('');
                  }}
                  style={{
                    width: '-webkit-fill-available',
                    borderRadius: '8px',
                    borderWidth: '1px',
                    borderColor: '#FFFFFF',
                    borderStyle: 'solid',
                    padding: 'clamp(12px, 1.11vw, 16px)',
                    paddingLeft: 'clamp(40px, 3.33vw, 48px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    fontFamily: 'ABeeZee, sans-serif',
                    fontWeight: 400,
                    fontStyle: 'normal',
                    fontSize: 'clamp(14px, 1.11vw, 16px)',
                    // lineHeight: '155%',
                    letterSpacing: '0%',
                    color: '#62626B',
                    opacity: 1,
                    outline: 'none'
                  }}
                  className="focus:ring-2 focus:ring-[#9414FF] placeholder:text-[#62626B]"
                />
              </div>

              {/* Error Messages */}
              {emailError && (
                <p className="text-red-500 text-sm" style={{ fontFamily: 'ABeeZee, sans-serif' }}>
                  {emailError}
                </p>
              )}
              {passwordError && (
                <p className="text-red-500 text-sm" style={{ fontFamily: 'ABeeZee, sans-serif' }}>
                  {passwordError}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isFormInvalid}
                style={{
                  width: '100%',
                  maxWidth: '381px',
                  height: 'clamp(40px, 2.99vw, 43px)',
                  borderRadius: '8px',
                  backgroundColor: '#9414FF',
                  color: '#ffffff',
                  paddingTop: 'clamp(10px, 0.83vw, 12px)',
                  paddingRight: 'clamp(16px, 1.39vw, 20px)',
                  paddingBottom: 'clamp(10px, 0.83vw, 12px)',
                  paddingLeft: 'clamp(16px, 1.39vw, 20px)',
                  opacity: 1,
                  border: 'none',
                  cursor: isFormInvalid ? 'not-allowed' : 'pointer',
                  fontFamily: 'ABeeZee, sans-serif',
                  fontWeight: 400,
                  fontSize: 'clamp(14px, 1.11vw, 16px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'clamp(3px, 0.28vw, 4px)'
                }}
                className="hover:bg-[#7b0dd1] transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            {/* Sign up text */}
            <p
              style={{
                fontFamily: 'ABeeZee, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '14px',
                // lineHeight: '155%',
                textAlign: 'center',
                color: '#62626B',
                marginTop: '8px',
                margin: '8px 0 0 0'
              }}
            >
              Don't have an account?{' '}
              <span
                style={{
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
                className="hover:text-[#9414FF]"
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Image and Logo */}
      <div className="flex flex-col justify-center relative h-full w-full col-span-6">
        {/* Right Section - Image and Logo */}
        <div className="flex flex-col justify-center items-center relative h-full w-full col-span-8" style={{ marginBottom: '80px' }}>
          <img
            src="/landing.png"
            alt="Landing"
            className="mb-8 max-w-full h-auto"
            style={{ maxWidth: '1630px' }}
          />
          <img
            src="/logo.png"
            alt="Logo"
            className="max-w-full h-auto"
            style={{ maxWidth: '413px' }}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;