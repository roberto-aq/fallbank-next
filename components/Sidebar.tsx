'use client';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { Footer } from './Footer';
import { PlaidLink } from './PlaidLink';

export const Sidebar = ({ user }: SiderbarProps) => {
	const pathname = usePathname();

	return (
		<section className='sidebar'>
			<nav className='flex flex-col gap-4'>
				<Logo />

				{sidebarLinks.map(item => {
					const isActive =
						pathname === item.route ||
						pathname.startsWith(`${item.route}/`);

					return (
						<Link
							key={item.label}
							href={item.route}
							className={cn(`sidebar-link`, {
								'bg-bank-gradient': isActive,
							})}
						>
							<div className='relative size-6'>
								<Image
									src={item.imgURL}
									alt={item.label}
									fill
									className={cn({
										'brightness-[3] invert-0': isActive,
									})}
								/>
							</div>

							<p
								className={cn('sidebar-label', {
									'!text-white': isActive,
								})}
							>
								{item.label}
							</p>
						</Link>
					);
				})}

				<PlaidLink user={user} variant='ghost' />
			</nav>

			<Footer user={user} />
		</section>
	);
};
