'use client';

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from '@/components/ui/sheet';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoMobile } from './LogoMobile';
import { Footer } from './Footer';

export const MobileNav = ({ user }: MobileNavProps) => {
	const pathname = usePathname();

	return (
		<section className='w-full max-w-[264px] z-10'>
			<Sheet>
				<SheetTrigger>
					<Image
						src='/icons/hamburger.svg'
						width={30}
						height={30}
						alt='menu'
						className='cursor-pointer'
					/>
				</SheetTrigger>
				<SheetContent side='left' className='border-none bg-white'>
					<LogoMobile />
					<div className='mobilenav-sheet'>
						<SheetClose asChild>
							<nav className='flex h-full flex-col gap-6 pt-16 text-white'>
								{sidebarLinks.map(item => {
									const isActive =
										pathname === item.route ||
										pathname.startsWith(`${item.route}/`);

									return (
										<SheetClose asChild key={item.route}>
											<Link
												href={item.route}
												className={cn(
													'mobilenav-sheet_close w-full',
													{
														'bg-bank-gradient': isActive,
													}
												)}
											>
												<div className='relative size-6'>
													<Image
														src={item.imgURL}
														alt={item.label}
														width={20}
														height={20}
														className={cn({
															'brightness-[3] invert-0': isActive,
														})}
													/>
												</div>

												<p
													className={cn(
														'text-16 font-semibold text-black-2',
														{
															'text-white': isActive,
														}
													)}
												>
													{item.label}
												</p>
											</Link>
										</SheetClose>
									);
								})}
								USER
							</nav>
						</SheetClose>
						<Footer user={user} type='mobile' />
					</div>
				</SheetContent>
			</Sheet>
		</section>
	);
};
