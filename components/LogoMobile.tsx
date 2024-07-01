import Image from 'next/image';
import Link from 'next/link';

export const LogoMobile = () => {
	return (
		<Link
			href='/'
			className='cursor-pointer flex items-center gap-1 px-4'
		>
			<Image
				src='/icons/logo.svg'
				width={34}
				height={34}
				alt='Fallbank logo'
			/>
			<h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
				FallBank
			</h1>
		</Link>
	);
};
