import { FaSearch, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className='bg-green-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Land</span>
            <span className='text-slate-700'>Lord</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className='bg-white px-3 py-2 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <ul className='flex items-center gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              About
            </li>
          </Link>
          <Link to={`${currentUser ? "/profile" : "/login"}`}>
            {currentUser ? (
              <li className="flex items-center gap-1  text-slate-800 hover:bg-gray-200 hover:rounded-full p-2 transition-all ease-in-out duration-500">
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            </li>
            ) : (
              <li className="flex items-center gap-1  text-slate-800 hover:text-green-700 hover:bg-green-200 hover:rounded-full p-2 px-4 transition-all ease-in-out duration-500">
              <FaUserCircle className="text-green-500" />
              <span>Login</span>
            </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
