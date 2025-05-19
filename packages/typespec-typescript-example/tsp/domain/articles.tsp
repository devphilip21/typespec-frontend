namespace Api.Articles;

model Article {
  id: int64;
  
  title: string;
  /**
   * the content of the article
   */
  content: string;
}
