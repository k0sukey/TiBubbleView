var TiBubble = require('be.k0suke.tibubble');

var win = Ti.UI.createWindow({
	backgroundColor: '#fff'
});
win.open();

var scroll = Ti.UI.createScrollView({
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
	width: Ti.UI.FILL,
	height: Ti.UI.FILL,
	layout: 'vertical'
});
win.add(scroll);

var messages = [
	'hello!',
	'hello...',
	'say hello to TiBubbleView',
	'春は、あけぼの。やうやう白くなりゆく山ぎは　少し明りて紫だちたる雲の細くたなびきたる。',
	'夏は、夜。月の頃はさらなり。闇もなほ。螢の多く飛び違ひたる。また、ただ一つ二つなど、ほのかにうち光りて行くもをかし。雨など降るもをかし。',
	'秋は、夕暮。夕日のさして、山の端（は）いと近うなりたるに、烏の寝どころへ行くとて、三つ四つ、二つ三つなど、飛び急ぐさへあはれなり。まいて雁などの連ねたるがいと小さく見ゆるは、いとをかし。日入り果てて、風の音、虫の音など、はたいふべきにあらず。',
	'冬は、つとめて。雪の降りたるはいふべきにもあらず。霜のいと白きも、またさらでも、いと寒きに、火など急ぎ熾して、炭もて渡るも、いとつきづきし。昼になりて、ぬるくゆるびもていけば、火桶の火も、白き灰がちになりて、わろし。'
];

var view, image, label, bubble,
	views = [];

for (var i = 0; i < messages.length; i++) {
	view = Ti.UI.createView({
		top: 20,
		right: 10,
		left: 10,
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE
	});
	views.push(view);

	if (i % 2) {
		image = Ti.UI.createImageView({
			right: 0,
			bottom: 0,
			width: 64,
			height: 64,
			image: 'right.png'
		});
	} else {
		image = Ti.UI.createImageView({
			bottom: 0,
			left: 0,
			width: 64,
			height: 64,
			image: 'left.png'
		});
	}
	view.add(image);

	label = Ti.UI.createLabel({
		top: 10,
		right: i % 2 ? 14 : 10,
		bottom: 10,
		left: i % 2 ? 10 : 14,
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		color: i % 2 ? '#fff' : '#000',
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		text: messages[i]
	});

	if (i % 2) {
		bubble = TiBubble.createView({
			top: 0,
			right: 74,
			width: Ti.UI.SIZE,
			height: Ti.UI.SIZE,
			bubbleColor: '#1cce39',
			bubbleRadius: 20,
			bubbleBeak: TiBubble.BUBBLE_BEAK_RIGHT
		});
	} else {
		bubble = TiBubble.createView({
			top: 0,
			left: 74,
			width: Ti.UI.SIZE,
			height: Ti.UI.SIZE,
			bubbleColor: '#dfdee5',
			bubbleRadius: 20,
			bubbleBeak: TiBubble.BUBBLE_BEAK_LEFT,
			bubbleBeakVertical: TiBubble.BUBBLE_BEAK_UPPER
		});
	}
	bubble.add(label);
	view.add(bubble);

	scroll.add(view);
}
