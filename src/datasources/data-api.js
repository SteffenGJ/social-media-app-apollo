const { RESTDataSource } = require("@apollo/datasource-rest");

class DataAPI extends RESTDataSource {
  //baseURL = "https://social-media-backend-0fpa.onrender.com/";
  baseURL = "https://social-media-backend-0fpa.onrender.com/";

  getUser(id) {
    return this.get(`api/user/${id}`);
  }

  getAllPosts() {
    return this.get(`api/posts`);
  }

  getPostsByUser(id) {
    return this.get(`api/posts/user/${id}`);
  }

  getFriendRecommendations(id) {
    return this.get(`api/user/${id}/recommendedFriends`);
  }

  getFriends(id) {
    return this.get(`api/user/${id}/friends`);
  }

  getFriendRequests(id) {
    return this.get(`api/user/${id}/friendRequests`);
  }

  getOutgoingRequests(id) {
    return this.get(`api/user/${id}/outgoingFriendRequests`);
  }

  getComments(id) {
    return this.get(`api/posts/${id}/comments`);
  }

  getPost(id) {
    return this.get(`api/posts/${id}`);
  }

  addUser(username, password, email) {
    return this.post(`api/user`, { body: { username, password, email } });
  }

  getFollowing(id) {
    return [];
  }

  getHasLiked(id) {
    return [];
  }

  sendFriendRequest(userId, matchId) {
    return this.post(`api/user/friendRequest`, { body: { userId, matchId } });
  }

  acceptFriendRequest(userId, requesterId) {
    return this.post(`api/user/${userId}/acceptFriend`, {
      body: { requesterId },
    });
  }

  addPost(text, authorId) {
    return this.post(`api/posts`, { body: { text, authorId } });
  }

  login(username, password) {
    return this.post(`api/login`, { body: { username, password } });
  }
}

module.exports = DataAPI;
