import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import useOnClickOutside from 'use-onclickoutside';
import Logo from '../../assets/icons/logo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import DropDownComp from '../drop-down';
import { loadUser } from '../../store/actions/authAction'
import { signOut } from 'next-auth/client'


const Header = ({ isErrorPage }) => {
  const router = useRouter();
  const { cartItems } = useSelector(state => state.cart);
  const arrayPaths = ['/'];

  const [onTop, setOnTop] = useState((!arrayPaths.includes(router.pathname) || isErrorPage) ? false : true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef(null);
  const searchRef = useRef(null);


  const dispatch = useDispatch()

  const { user, loading } = useSelector(state => state.loadedUser)

  useEffect(() => {
      if (!user) {
          dispatch(loadUser())
      }
  }, [dispatch, user])


  const logoutHandler = () => {
      signOut();
  }


  const headerClass = () => {
    if (window.pageYOffset === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  }

  useEffect(() => {
    if (!arrayPaths.includes(router.pathname) || isErrorPage) {
      return;
    }

    headerClass();
    window.onscroll = function () {
      headerClass();
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  }

  const closeSearch = () => {
    setSearchOpen(false);
  }

  // on click outside
  useOnClickOutside(navRef, closeMenu);
  useOnClickOutside(searchRef, closeSearch);

  const optionsUsd2 = [
    { name: "Login", path: "/login" }
  ]
  const optionsUsd = [
    { name: "Logout", path: "/logout" }
  ]

  return (
    <header className={`site-header ${!onTop ? 'site-header--fixed' : ''}`}>
      <div className="container">
        <Link href="/">
          <a><h1 className="site-logo">
            {/* <Logo /> */}
            {/* E-Shop */}
            Logo
          </h1></a>
        </Link>
        <nav ref={navRef} className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`}>
          <Link href="/">
            <a href="/">Home</a>
          </Link>
          {user ? <a href="/admin">Admin </a> : ""}
          <Link href="/products">
            <a>Products</a>
          </Link>
          <a href="#">Blog</a>
          <a href="#">Shop</a>
          <a href="#">Contact</a>
          <button className="site-nav__btn"><p>Account</p></button>
        </nav>

        <div className="site-header__actions">
          <button ref={searchRef} className={`search-form-wrapper ${searchOpen ? 'search-form--active' : ''}`}>
            <form className={`search-form`}>
              <i className="icon-cancel" onClick={() => setSearchOpen(!searchOpen)}></i>
              <input type="text" name="search" placeholder="Enter the product you are looking for" />
            </form>
            <i onClick={() => setSearchOpen(!searchOpen)} className="icon-search"></i>
          </button>
          <Link href="/cart">
            <button className="btn-cart">
              <i className="icon-cart"></i>
              {cartItems.length > 0 &&
                <span className="btn-cart__count">{cartItems.length}</span>
              }
            </button>
          </Link>



{user ?<Link href='/'>
                <a className="dropdown-item text-danger" onClick={logoutHandler}>Logout</a>
        </Link>
 :
    !loading && <Link href='/login'>
        <a className="btn btn-danger px-4 text-white login-header-btn float-right">Login</a>
    </Link>
}

          {/* <Link href="/login"> */}
            {/* <button className="site-header__btn-avatar"><i className="icon-avatar"></i></button> */}
            {/* <DropDownComp
            name={<i className="icon-avatar"></i>}
            options={optionsUsd}
            style={"bg-transparent focus:bg-transparent hover:bg-transparent"}
          /> */}
          {/* </Link> */}
          {/* <Link href="/" onClick={logoutHandler}> */}
            {/* <button className="site-header__btn-avatar">Logout</button> */}
            {/* <DropDownComp
            name={<i className="icon-avatar"></i>}
            options={optionsUsd}
            style={"bg-transparent focus:bg-transparent hover:bg-transparent"}
          /> */}
          {/* </Link> */}
          <button
            onClick={() => setMenuOpen(true)}
            className="site-header__btn-menu">
            <i className="btn-hamburger"><span></span></i>
          </button>
        </div>
      </div>
    </header >
  )
};


export default Header;
