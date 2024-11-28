const axios = require('axios');
const config = require("../../resconfig");

async function createUser(email, username,password) {
    if (!email || !username || !password) {
      throw new Error('Email dan username tidak boleh kosong');
    }
  
    const apiUrl = `${config.PANEL.URL}/api/application/users`;
  
    const data = {
      email: email,
      username: username,
      first_name: username,
      last_name: username,
      password : password
    };
  
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.PANEL.KEY_APPLICATION}`
    };
  
    try {
      const response = await axios.post(apiUrl, data, { headers });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Internal Server Error');
    }
}

async function listserver(page = 1) {
  const url = `${config.PANEL.URL}/api/application/servers?page=${page}`;
  try {
      const response = await axios.get(url, {
          headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${config.PANEL.KEY_APPLICATION}`
          }
      });
      return response.data;
  } catch (error) {
      throw error; // Mengirim error ke pemanggil jika perlu
  }
}

async function listUser(page=1) {
    const apiUrl = `${config.PANEL.URL}/api/application/users?page=${page}`;
  
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.PANEL.KEY_APPLICATION}`
    };
    try {
      const response = await axios.get(apiUrl, { headers });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Internal Server Error');
    }
}

async function UpdateUser(userId, email, username, newPassword) {
    const apiUrl = `${config.PANEL.URL}/api/application/users/${userId}`;
    const data = {
      email: email,
      username: username,
      first_name: username,
      last_name: username,
      language: "en",
      password: newPassword
    };
  
    try {
      const response = await axios.patch(apiUrl, data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.PANEL.KEY_APPLICATION}`
        },
        withCredentials: true
      });
  
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : 'Internal Server Error';
    }
}

async function createServer(name_server, id_panel, resource) {
    const apiUrl = `${config.PANEL.URL}/api/application/servers`;
    const data = {
      name: name_server,
      user: id_panel,
      egg: config.PANEL.SERVER_EGG,
      docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
      startup: "if [[ -d .git ]] && [[ 0 == '1' ]]; then git pull; fi; if [[ ! -z \${NODE_PACKAGES} ]]; then /usr/local/bin/npm install \${NODE_PACKAGES}; fi; if [[ ! -z \${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall \${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/node /home/container/index.js",
      environment: {
        INST: 'npm',
        USER_UPLOAD: '0',
        AUTO_UPDATE : '0',
        CMD_RUN : 'npm start',
        JS_FILE : 'index.js',
        P_SERVER_ALLOCATION_LIMIT : '0'
      },
      limits: resource,
      feature_limits: {
        databases: 0,
        backups: 0,
        allocations : 0
      },
      description : config.PANEL.description,
      deploy : {
        locations: [config.PANEL.id_location],
        dedicated_ip : false,
        port_range: [config.PANEL.port_range]
      },
      allocation: {
        default: 1
      },
      start_on_completion : true,
      skip_scripts : false,
      oom_disabled : true
    };
  
    try {
      const response = await axios.post(apiUrl, data, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.PANEL.KEY_APPLICATION}`
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Internal Server Error');
    }
}


async function getServerFilter(page, uuid) {
    const url = `${config.PANEL.URL}/api/application/servers?per_page=${page}&filter[uuid]=${uuid}`;
  try {
      const response = await axios.get(url, {
          headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${config.PANEL.KEY_APPLICATION}`
          }
      });
      return response.data;
  } catch (error) {
      throw error; // Mengirim error ke pemanggil jika perlu
  }
}

async function deleteServer(idserver) {
  const apiUrl = `${config.PANEL.URL}/api/application/servers/${idserver}/force`;
  try {
      const response = await axios.delete(apiUrl, {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${config.PANEL.KEY_APPLICATION}`
          }
      })
      return response.status >= 200 && response.status < 300;
  } catch (error) {
      // Handle error
      throw error.response ? error.response.data : new Error('Internal Server Error');
  }
}

async function deleteUser(id_user) {
  const apiUrl = `${config.PANEL.URL}/api/application/users/${id_user}`;
  try {
      const response = await axios.delete(apiUrl, {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${config.PANEL.KEY_APPLICATION}`
          }
      })
      console.log(response.data)
      return response.status >= 200 && response.status < 300;
  } catch (error) {
      // Handle error
      throw error.response ? error.response.data : new Error('Internal Server Error');
  }
}


async function getServerByUUID(uuid) {
  const url = `${config.PANEL.URL}/api/application/servers?per_page=10&filter[uuid]=${uuid}`;  
  try {
      const response = await axios.get(url, {
          headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${config.PANEL.KEY_APPLICATION}`
          }
      });
      return response.data.data;
  } catch (error) {
      throw error; // Mengirim error ke pemanggil jika perlu
  }
}


module.exports = {createUser, listserver, listUser, deleteServer,deleteUser, UpdateUser, createServer, getServerByUUID, deleteServer, getServerFilter };