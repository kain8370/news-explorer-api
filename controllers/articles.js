const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

function getArticles(req, res, next) {
  Article.find({ owner: req.user })
    .then((articles) => {
      if (articles) {
        res.send(articles);
      } else {
        throw new NotFoundError('Статьи не найдены!');
      }
    })
    .catch(next);
}

function createArticle(req, res, next) {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;
  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.send({ data: article }))
    .catch(next);
}

function deleteArticle(req, res, next) {
  Article.findById(req.params.articleId, (err) => {
    if (err) {
      next(new NotFoundError('Такая статья не найдена!'));
    }
  })
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Така статья не найдена!');
      }
      if (article.owner.toString() === req.user._id.toString()) {
        Article.remove(article)
          .then((data) => res.send({ data }));
      } else {
        throw new ForbiddenError('У вас нету доступа к чухой статье!');
      }
    })
    .catch(next);
}

module.exports = {
  getArticles, createArticle, deleteArticle,
};
