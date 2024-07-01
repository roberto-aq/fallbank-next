import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
	return (
		<Link
			href='/'
			className='mb-12 cursor-pointer flex items-center gap-2'
		>
			<Image
				src='/icons/logo.svg'
				width={34}
				height={34}
				alt='Fallbank logo'
				className='size-[24px] max-xl:size-14'
			/>
			<h1 className='sidebar-logo'>FallBank</h1>
		</Link>
	);
};
