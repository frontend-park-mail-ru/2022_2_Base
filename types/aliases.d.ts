import LoginPage from '../pages/LoginPage/LoginPage';
import MainPage from '../pages/MainPage/MainPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import CartPage from '../pages/CartPage/CartPage';
import OrdersPage from '../pages/OrdersPage/OrdersPage';
import CategoryPage from '../pages/CatalogPage/CategoryPage/CategoryPage';
import SearchPage from '../pages/CatalogPage/SearchPage/SearchPage';
import ProductPage from '../pages/ItemPage/ProductPage/ProductPage';
import CommentPage from '../pages/ItemPage/CommentPage/CommentPage';
import AddCommentPage from '../pages/ItemPage/AddCommentPage/AddCommentPage';
import UserPage from '../pages/UserPage/UserPage';
import CartItem from '../public/src/components/CartItem/CartItem';
import AddressCard from '../public/src/components/InfoCard/AddressCard/AddressCard';

type CustomPages = LoginPage & MainPage & RegisterPage & ErrorPage & CartPage & OrdersPage &
    CategoryPage & SearchPage & ProductPage & CommentPage & AddCommentPage & UserPage;

type UserPageLoadCardsPages = AddressCard | PaymentCard | null;

type addEventListenerFunction = addListenerFunction | emptyCallback;
