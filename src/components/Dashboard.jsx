import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    // Clear all stored data
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    // Clear cookie token
    document.cookie = 'token=; Path=/; Max-Age=0; SameSite=Lax';
    
    // Clear Zustand store
    logout();
    
    // Navigate to login
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center p-5">
      <div className="bg-white rounded-[20px] p-[60px_80px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] max-w-[600px] w-full">
        <h1 className="text-[42px] font-bold text-[#333333] mb-10 text-center">Dashboard</h1>
        
        <div className="bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] rounded-[16px] p-10 mb-8 text-center">
          <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-[#9333EA] to-[#7C2DED] text-white flex items-center justify-center text-5xl font-bold mx-auto mb-8 shadow-[0_8px_20px_rgba(147,51,234,0.3)]">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center py-3 border-b border-[#e0e0e0] last:border-b-0">
              <span className="text-base font-semibold text-[#666666]">ID:</span>
              <span className="text-base font-bold text-[#333333]">{user?.id || 'N/A'}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-[#e0e0e0] last:border-b-0">
              <span className="text-base font-semibold text-[#666666]">Name:</span>
              <span className="text-base font-bold text-[#333333]">{user?.name || 'N/A'}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-[#e0e0e0] last:border-b-0">
              <span className="text-base font-semibold text-[#666666]">Email:</span>
              <span className="text-base font-bold text-[#333333]">{user?.email || 'N/A'}</span>
            </div>
          </div>
        </div>
        
        <button 
          className="w-full py-4 bg-gradient-to-b from-[#9333EA] to-[#7C2DED] text-white border-none rounded-lg text-base font-bold cursor-pointer transition-all hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
