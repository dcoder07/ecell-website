import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

// Stores
import { useMenuStore } from '~/stores';

// Utils
import { slide, scale } from '~/utils/framer';

import { LinkProps } from '..';

interface LinkPropsWithIndex extends LinkProps {
	index: number;
}

interface MenuPageItemProps {
	data: LinkPropsWithIndex;
	isActive: boolean;
	setSelectedIndicator: React.Dispatch<React.SetStateAction<string>>;
}

const MenuPageItem = ({
	data,
	isActive,
	setSelectedIndicator,
}: MenuPageItemProps) => {
	const router = useRouter();
	const { setOpen } = useMenuStore();
	const { title, href, index } = data;

	const onClick = (href: string) => {
		router.push(href).then(() => setOpen(false));
	};

	return (
		<motion.div
			className='relative flex cursor-pointer items-center text-4xl font-medium sm:text-5xl'
			onMouseEnter={() => {
				setSelectedIndicator(href);
			}}
			custom={index}
			variants={slide}
			initial='initial'
			animate='enter'
			exit='exit'
		>
			<motion.div
				variants={scale}
				animate={isActive ? 'open' : 'closed'}
				className='absolute left-[-30px] h-3 w-3 rounded-full bg-white'
			></motion.div>
			<div onClick={() => onClick(href)}>{title}</div>
		</motion.div>
	);
};

export default MenuPageItem;
