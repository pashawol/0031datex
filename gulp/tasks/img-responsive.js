module.exports = function () {

	const sourse2 = $.sourse + '/img';
	const path = $.public + '/img';
	let src = sourse2 + "/*.{png,jpg,jpeg,webp,raw}";

	// Clean @*x IMG's
	$.gulp.task('cleanimg', function () {
		return $.del([path + '/@*'], { force: true })
	});
	$.gulp.task('img-responsive', async function () {
		return $.gulp.src(src)
			.pipe($.gp.newer(path + '/@1x'))
			.pipe($.gp.responsive({
				'*': [{
					// Produce @2x images
					width: '100%', quality: 75, progressive: true, rename: { prefix: '@2x/', },
				},
				{
					// Produce @1x images
					width: '50%', quality: 75, progressive: true, rename: { prefix: '@1x/', }
				},
				{
					width: '100%', quality: 100, progressive: true, rename: { prefix: '@2x/webp/', extname: '.webp', },
				},
				{
					width: '50%', quality: 100, progressive: true, rename: { prefix: '@1x/webp/', extname: '.webp', },
				},

				]
			})).on('error', function () { console.log('No matching images found') })
			.pipe($.gp.rename(function (path) { path.extname = path.extname.replace('jpeg', 'jpg') }))
			.pipe($.gulp.dest(path))
	});
}