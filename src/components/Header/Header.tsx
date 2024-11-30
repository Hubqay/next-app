import React from "react";
import style from "./header.module.css";
import {Link} from "@/i18n/routing";

type HeaderProps = {
	name: string;
	path: string;
}

const menuLinks: HeaderProps[] = [
	{name: "Home", path: "/"},
	{name: "Movies", path: "/movie/popular/1"},
	{name: "Tv series", path: "/tv/popular/1"},
	{name: "Actors", path: "/person/popular/1"}
]

const Header: React.FC = () => {
	return (
		<header className={style.header}>
			<nav>
				<ul>
					{menuLinks.map(({name, path}, index: number) => (
						<li key={index}>
							<Link href={path}>{name}</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	)
}

export default Header;