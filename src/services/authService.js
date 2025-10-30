import axios from 'axios';

const API_BASE_URL = 'https://api-yeshtery.dev.meetusvr.com/v1';

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/yeshtery/token`,
        {
          email,
          password,
          isEmployee: true
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default authService;

