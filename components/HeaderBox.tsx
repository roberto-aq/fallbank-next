export const HeaderBox = ({
	type,
	user,
	subtext,
	title,
}: HeaderBoxProps) => {
	return (
		<div className='header-box'>
			<h1 className='header-box-title'>
				{title}

				{type === 'greeting' && (
					<span className='text-bankGradient capitalize'>
						&nbsp;{user}
					</span>
				)}
			</h1>
			<p className='header-box-subtext'>{subtext}</p>
		</div>
	);
};
