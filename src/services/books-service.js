import { API_CONFIG } from "./config";
import { pagination } from "../constants";

export default class BooksService {
  async getBooksByQuery(query, orderBy, subject, page = 0) {
    const response = await fetch(
      this.getConfiguredUrl("volumes", [
        `&q=${query}${subject !== "all" ? `+subject=${subject}` : ""}`,
        `&orderBy=${orderBy}`,
        `&startIndex=${pagination * page}`,
      ])
    );
    return await response.json();
  }

  getConfiguredUrl(mainAddress, queryParams = []) {
    return (
      API_CONFIG.url +
      mainAddress +
      `?key=${API_CONFIG.apiKey}` +
      `&maxResults=${pagination}` +
      queryParams.join("")
    );
  }
}
