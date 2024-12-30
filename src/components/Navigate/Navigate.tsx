"use client";

import React, {useEffect, useState} from "react";
import {Link} from "@/i18n/routing";
import { CiHome, CiSearch, CiLogin, CiBookmark } from 'react-icons/ci'
import { usePathname } from 'next/navigation'
import style from "./navigate.module.css";

type HeaderProps = {
	name: string;
	path: string;
	Icon: React.JSX.Element;
}

const menuLinks: HeaderProps[] = [
	{name: "Home", Icon: <CiHome/>, path: "/"},
	{name: "Search", Icon: <CiSearch/>, path: "/search"},
	{name: "Bookmarks", Icon: <CiBookmark />, path: "/favorite"},
	{name: "Login", Icon: <CiLogin/>, path: "/login"}
]

const Navigate: React.FC = () => {
	const [isActive, setIsActive] = useState<number>(0)

	const pathname = usePathname();

	useEffect(() => {
		return pathname.includes('search') ? setIsActive(1)
			: pathname.includes('search') ? setIsActive(2)
			: pathname.includes('login') ? setIsActive(3)
			: setIsActive(0)
	}, [pathname])

	return (
		<header className={style.navigate}>
			<nav>
				<ul>
					{menuLinks.map(({ name, path, Icon }, index: number) => (
						<li key={name} style={{opacity: isActive === index ? 1 : 0.5}}>
							<Link href={path}>{Icon}</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	)
}

export default Navigate;