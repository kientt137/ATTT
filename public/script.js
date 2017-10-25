$(document).ready(function() {

    var phrases = [
        'Đừng làm anh lo lắng như vậy nữa nhé',
        'Anh không chịu nổi đâu',
        'Em rất quan trọng với Anh',
        'Anh yêu  em nhiều lắm',
    ];
    var len = phrases.length;
    var index = 0;

    var ctrl = bubbleText({
        element: $('#bubble'),
        newText: phrases[index++],
        letterSpeed: 70,
        repeat: Infinity,
        timeBetweenRepeat: 1000,
        callback: function() {
            this.newText = phrases[index++ % len];
        },
    });

});
