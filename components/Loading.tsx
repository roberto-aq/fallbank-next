import Image from 'next/image';

export const Loading = () => {
	return (
		<div className='w-full h-full flex items-center justify-center'>
			<Image
				src='/icons/loading.svg'
				width={60}
				height={60}
				alt='Icon Loading'
			/>
		</div>
	);
};
