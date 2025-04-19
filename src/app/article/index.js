import { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import { useDispatch, useSelector } from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';
import HeadLayout from '../../components/head-layout';
import listToTree from '../../utils/list-to-tree';
import CommentList from '../../components/comment-list';

function Article() {
  const store = useStore();

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(() => {
    // store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
    // store.actions.comments.getCommentsById(params.id);
  }, [params.id]);

  const select = useSelector(
    state => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comments.data,
      count: state.comments.count,
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  };

  console.log('Comments in Article', select.comments);
  console.log('Count comments', select.count);
  // function buildCommentTree(comments) {
  //   // console.log('buildCommentTree', comments);
  //   const commentMap = {};
  //   const commentTree = [];
  
  //   // Создаем карту комментариев по их ID
  //   comments.forEach(comment => {
  //     commentMap[comment._id] = { ...comment, replies: [] };
  //   });
  
  //   // Строим дерево комментариев
  //   comments.forEach(comment => {
  //     if (comment.parent?._type === "article") {
  //       commentTree.push(commentMap[comment._id]);
  //     } else if (comment.parent?._type === "comment") {
  //       const parentComment = commentMap[comment.parent._id];
  //       if (parentComment) {
  //         parentComment.replies.push(commentMap[comment._id]);
  //       }
  //     }
  //   });
  
  //   return commentTree;
  // }

  // const buildComments = buildCommentTree(comments);

  // const comments = treeToList(listToTree(select.comments), (item, level) => ({value: item._id, title: item.text }));
  // console.log('Build comments', buildComments);
  const comments = [
    {
      "_id": "67fee024de177582e52335bb",
      "text": "Первый коммент!",
      "dateCreate": "2025-04-15T22:39:32.013Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fb67e98702ec3fc67fef7c",
        "_type": "article"
      },
      "isDeleted": false
    },
    {
      "_id": "67fee064de177582e52335c2",
      "text": "Второй коммент!",
      "dateCreate": "2025-04-15T22:40:36.407Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fb67e98702ec3fc67fef7c",
        "_type": "article"
      },
      "isDeleted": false
    },
    {
      "_id": "67fee07ede177582e52335c5",
      "text": "Ответ на первый коммент!",
      "dateCreate": "2025-04-15T22:41:02.889Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fee024de177582e52335bb",
        "_type": "comment"
      },
      "isDeleted": false
    },
    {
      "_id": "67ff6be2de177582e52338d7",
      "text": "d",
      "dateCreate": "2025-04-16T08:35:46.413Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fee07ede177582e52335c5",
        "_type": "comment"
      },
      "isDeleted": false
    },
    {
      "_id": "67ff953dde177582e5233a57",
      "text": "jhjh\n",
      "dateCreate": "2025-04-16T11:32:13.679Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fb67e98702ec3fc67fef7c",
        "_type": "article"
      },
      "isDeleted": false
    },
    {
      "_id": "67ff9540de177582e5233a59",
      "text": "jhjh\n",
      "dateCreate": "2025-04-16T11:32:16.470Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fb67e98702ec3fc67fef7c",
        "_type": "article"
      },
      "isDeleted": false
    },
    {
      "_id": "67ff95d2de177582e5233a6e",
      "text": "hgthh\n",
      "dateCreate": "2025-04-16T11:34:42.411Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fb67e98702ec3fc67fef7c",
        "_type": "article"
      },
      "isDeleted": false
    },
    {
      "_id": "67ff95dede177582e5233a71",
      "text": "jhjhj",
      "dateCreate": "2025-04-16T11:34:54.911Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fb67e98702ec3fc67fef7c",
        "_type": "article"
      },
      "isDeleted": false
    },
    {
      "_id": "67ff9644de177582e5233a90",
      "text": "jhjj",
      "dateCreate": "2025-04-16T11:36:36.379Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fb67e98702ec3fc67fef7c",
        "_type": "article"
      },
      "isDeleted": false
    },
    {
      "_id": "67ffb9c8de177582e5233db3",
      "text": "Hi\n",
      "dateCreate": "2025-04-16T14:08:08.895Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67ff953dde177582e5233a57",
        "_type": "comment"
      },
      "isDeleted": false
    },
    {
      "_id": "67ffcbaa6bc0478e51e8e835",
      "text": "GhbdTn",
      "dateCreate": "2025-04-16T15:24:26.723Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fb67e98702ec3fc67fef7c",
        "_type": "article"
      },
      "isDeleted": false
    },
    {
      "_id": "67ffcbb06bc0478e51e8e837",
      "text": "ggggg",
      "dateCreate": "2025-04-16T15:24:32.481Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fb67e98702ec3fc67fef7c",
        "_type": "article"
      },
      "isDeleted": false
    },
    {
      "_id": "67ffcbc26bc0478e51e8e84a",
      "text": "HELLO!",
      "dateCreate": "2025-04-16T15:24:50.775Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fb67e98702ec3fc67fef7c",
        "_type": "article"
      },
      "isDeleted": false
    },
    {
      "_id": "67ffd0ba6bc0478e51e8e890",
      "text": "Ответ на это сообщение",
      "dateCreate": "2025-04-16T15:46:02.067Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67ffcbc26bc0478e51e8e84a",
        "_type": "comment"
      },
      "isDeleted": false
    },
    {
      "_id": "67ffd1206bc0478e51e8e89c",
      "text": "11",
      "dateCreate": "2025-04-16T15:47:44.523Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fb67e98702ec3fc67fef7c",
        "_type": "article"
      },
      "isDeleted": false
    },
    {
      "_id": "67ffd3056bc0478e51e8e8b8",
      "text": "Хай хай",
      "dateCreate": "2025-04-16T15:55:49.436Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67ffd1206bc0478e51e8e89c",
        "_type": "comment"
      },
      "isDeleted": false
    },
    {
      "_id": "680000966bc0478e51e8ec2a",
      "text": "fffff\n",
      "dateCreate": "2025-04-16T19:10:14.940Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fb67e98702ec3fc67fef7c",
        "_type": "article"
      },
      "isDeleted": false
    },
    {
      "_id": "680006476bc0478e51e8ecf7",
      "text": "ffff\n",
      "dateCreate": "2025-04-16T19:34:31.501Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fb67e98702ec3fc67fef7c",
        "_type": "article"
      },
      "isDeleted": false
    },
    {
      "_id": "6800064d6bc0478e51e8ecfa",
      "text": "uuuu\n",
      "dateCreate": "2025-04-16T19:34:37.987Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fb67e98702ec3fc67fef7c",
        "_type": "article"
      },
      "isDeleted": false
    },
    {
      "_id": "680006656bc0478e51e8ecfe",
      "text": "f word\n\n",
      "dateCreate": "2025-04-16T19:35:01.945Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fb67e98702ec3fc67fef7c",
        "_type": "article"
      },
      "isDeleted": false
    },
    {
      "_id": "680006b16bc0478e51e8ed04",
      "text": "derf\n",
      "dateCreate": "2025-04-16T19:36:17.830Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fb67e98702ec3fc67fef7c",
        "_type": "article"
      },
      "isDeleted": false
    },
    {
      "_id": "680006bc6bc0478e51e8ed06",
      "text": "dfd",
      "dateCreate": "2025-04-16T19:36:28.007Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "680006476bc0478e51e8ecf7",
        "_type": "comment"
      },
      "isDeleted": false
    },
    {
      "_id": "680008376bc0478e51e8ed19",
      "text": "Hm\n\n\n\n",
      "dateCreate": "2025-04-16T19:42:47.583Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67ffb9c8de177582e5233db3",
        "_type": "comment"
      },
      "isDeleted": false
    },
    {
      "_id": "680008bc6bc0478e51e8ed26",
      "text": "hjj",
      "dateCreate": "2025-04-16T19:45:00.600Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67ff6be2de177582e52338d7",
        "_type": "comment"
      },
      "isDeleted": false
    },
    {
      "_id": "68008dc06bc0478e51e8f313",
      "text": "dasdad",
      "dateCreate": "2025-04-17T05:12:32.799Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fb67e98702ec3fc67fef7c",
        "_type": "article"
      },
      "isDeleted": false
    },
    {
      "_id": "680094796bc0478e51e8f376",
      "text": "a",
      "dateCreate": "2025-04-17T05:41:13.930Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fb67e98702ec3fc67fef7c",
        "_type": "article"
      },
      "isDeleted": false
    },
    {
      "_id": "680094916bc0478e51e8f37a",
      "text": "lol",
      "dateCreate": "2025-04-17T05:41:37.310Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fee024de177582e52335bb",
        "_type": "comment"
      },
      "isDeleted": false
    },
    {
      "_id": "6800aa406bc0478e51e8f588",
      "text": "Z",
      "dateCreate": "2025-04-17T07:14:08.879Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fee024de177582e52335bb",
        "_type": "comment"
      },
      "isDeleted": false
    },
    {
      "_id": "6800aa4f6bc0478e51e8f58b",
      "text": "z",
      "dateCreate": "2025-04-17T07:14:23.510Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "680008bc6bc0478e51e8ed26",
        "_type": "comment"
      },
      "isDeleted": false
    },
    {
      "_id": "6800ab3a6bc0478e51e8f5c3",
      "text": "вфывфв",
      "dateCreate": "2025-04-17T07:18:18.514Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fb67e98702ec3fc67fef7c",
        "_type": "article"
      },
      "isDeleted": false
    },
    {
      "_id": "6800ac416bc0478e51e8f5ec",
      "text": "d",
      "dateCreate": "2025-04-17T07:22:41.172Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "6800ab3a6bc0478e51e8f5c3",
        "_type": "comment"
      },
      "isDeleted": false
    },
    {
      "_id": "6800ad286bc0478e51e8f5fe",
      "text": "ф",
      "dateCreate": "2025-04-17T07:26:32.697Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "6800ac416bc0478e51e8f5ec",
        "_type": "comment"
      },
      "isDeleted": false
    },
    {
      "_id": "6800adb46bc0478e51e8f611",
      "text": "ф",
      "dateCreate": "2025-04-17T07:28:52.775Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "6800064d6bc0478e51e8ecfa",
        "_type": "comment"
      },
      "isDeleted": false
    },
    {
      "_id": "6800adba6bc0478e51e8f616",
      "text": "ф",
      "dateCreate": "2025-04-17T07:28:58.717Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "680006b16bc0478e51e8ed04",
        "_type": "comment"
      },
      "isDeleted": false
    },
    {
      "_id": "6800c3de6bc0478e51e8f8ab",
      "text": "111",
      "dateCreate": "2025-04-17T09:03:26.774Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "6800aa4f6bc0478e51e8f58b",
        "_type": "comment"
      },
      "isDeleted": false
    },
    {
      "_id": "6800e4fe6bc0478e51e8fe19",
      "text": "123",
      "dateCreate": "2025-04-17T11:24:46.962Z",
      "author": {
        "profile": {
          "name": "User №10"
        },
        "_id": "67fb67dc8702ec3fc67fe388"
      },
      "parent": {
        "_id": "67fb67e98702ec3fc67fef7c",
        "_type": "article"
      },
      "isDeleted": false
    },
    {
      "_id": "6800ecc26bc0478e51e90002",
      "text": "gfdgdgdfg",
      "dateCreate": "2025-04-17T11:57:54.218Z",
      "author": {
        "profile": {
          "name": "User №10"
        },
        "_id": "67fb67dc8702ec3fc67fe388"
      },
      "parent": {
        "_id": "67fb67e98702ec3fc67fef7c",
        "_type": "article"
      },
      "isDeleted": false
    },
    {
      "_id": "6800edc96bc0478e51e9006f",
      "text": "абракадабра",
      "dateCreate": "2025-04-17T12:02:17.174Z",
      "author": {
        "profile": {
          "name": "User №8"
        },
        "_id": "67fb67dc8702ec3fc67fe386"
      },
      "parent": {
        "_id": "67ffd0ba6bc0478e51e8e890",
        "_type": "comment"
      },
      "isDeleted": false
    },
    {
      "_id": "6800f2326bc0478e51e9014f",
      "text": "wwww52",
      "dateCreate": "2025-04-17T12:21:06.025Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fb67e98702ec3fc67fef7c",
        "_type": "article"
      },
      "isDeleted": false
    },
    {
      "_id": "6800f3176bc0478e51e9019f",
      "text": "wwwwwasdasd",
      "dateCreate": "2025-04-17T12:24:55.856Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fb67e98702ec3fc67fef7c",
        "_type": "article"
      },
      "isDeleted": false
    },
    {
      "_id": "6800f3286bc0478e51e901ab",
      "text": "asfasfasf",
      "dateCreate": "2025-04-17T12:25:12.125Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "6800c3de6bc0478e51e8f8ab",
        "_type": "comment"
      },
      "isDeleted": false
    },
    {
      "_id": "6800f3686bc0478e51e901bb",
      "text": "wwww",
      "dateCreate": "2025-04-17T12:26:16.039Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "6800f3286bc0478e51e901ab",
        "_type": "comment"
      },
      "isDeleted": false
    },
    {
      "_id": "6800f36f6bc0478e51e901be",
      "text": "dasdasd",
      "dateCreate": "2025-04-17T12:26:23.350Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fb67e98702ec3fc67fef7c",
        "_type": "article"
      },
      "isDeleted": false
    },
    {
      "_id": "6800f3736bc0478e51e901c1",
      "text": "sssssss",
      "dateCreate": "2025-04-17T12:26:27.764Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fb67e98702ec3fc67fef7c",
        "_type": "article"
      },
      "isDeleted": false
    },
    {
      "_id": "6800f3816bc0478e51e901c4",
      "text": "asdas",
      "dateCreate": "2025-04-17T12:26:41.344Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fee024de177582e52335bb",
        "_type": "comment"
      },
      "isDeleted": false
    },
    {
      "_id": "6800f3886bc0478e51e901c7",
      "text": "Ответ\n",
      "dateCreate": "2025-04-17T12:26:48.517Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fee024de177582e52335bb",
        "_type": "comment"
      },
      "isDeleted": false
    }
  ];
  let buildComments = [];
  console.log('Исходный List', select.comments);
  if (Array.isArray(select?.comments) && select.comments.length > 0) {
    buildComments = listToTree(select?.comments)[0].children;
    console.log('Преобразованный List', buildComments);
  } else {
    console.log('Комментарии еще не загружены или пусты');
  }

  return (
    <>
      <HeadLayout>
        <TopHead />
      </HeadLayout>
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <Spinner active={select.waiting}>
          <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
          <CommentList comments={buildComments} commentCount={select?.count} />
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Article);
