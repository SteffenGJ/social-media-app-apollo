const { RESTDataSource } = require("@apollo/datasource-rest");

class ExampleAPI extends RESTDataSource {
  baseURL = "https://url.com/";

  getExampleQuery(id) {
    return this.get(`example/${id}`);
  }

  getAuthor(authorId) {
    return this.get(`author/${authorId}`);
  }

  incrementExampleViews(exampleId) {
    return this.post(`example/${exampleId}/numberOfViews`);
  }
}

module.exports = ExampleAPI;
