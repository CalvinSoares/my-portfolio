import Link from "next/link"

const NavLink = ({ href, title }) => {
    return (
        <Link 
        href={href} 
        className='text-white sm:text-xl hover:text-[#242424] duration-200 border-b-2 hover:border-none border-[#583ebc]'
        >
            {title}
        </Link>
    )
}

export default NavLink;