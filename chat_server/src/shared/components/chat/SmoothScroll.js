export default {
    timer: null,

    stop: () => {
        clearTimeout(this.timer);
    },

    scrollTo: (id, callback) => {
        var settings = {
            duration: 1000,
            easing: {
                outQuint: function (x, t, b, c, d) {
                    return c*((t=t/d-1)*t*t*t*t + 1) + b;
                }
            }
        };
        var percentage;
        var startTime;
        var node = document.getElementById(id);
        var nodeTop = node.offsetTop;
        var nodeHeight = node.offsetHeight;
        var body = document.body;
        var html = document.documentElement;
        var height = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );
        var windowHeight = window.innerHeight
        var offset = window.pageYOffset;
        var delta = nodeTop - offset;
        var bottomScrollableY = height - windowHeight;
        var targetY = (bottomScrollableY < delta) ?
            bottomScrollableY - (height - nodeTop - nodeHeight + offset):
            delta;

        startTime = Date.now();
        percentage = 0;

        if (this.timer) {
            clearInterval(this.timer);
        }

        function step () {
            var yScroll;
            var elapsed = Date.now() - startTime;

            if (elapsed > settings.duration) {
                clearTimeout(this.timer);
            }

            percentage = elapsed / settings.duration;

            if (percentage > 1) {
                clearTimeout(this.timer);

                if (callback) {
                    callback();
                }
            } else {
                yScroll = settings.easing.outQuint(0, elapsed, offset, targetY, settings.duration);
                window.scrollTo(0, yScroll);
                this.timer = setTimeout(step, 10);     
            }
        }

        this.timer = setTimeout(step, 10);
    }
}
































// var App = React.createClass({
//     render: function () {
//       return <div><SmoothScroll /></div>;
//     }
//   });

// var smoothScroll = {
//     timer: null,

//     stop: () => {
//         clearTimeout(this.timer);
//     },

//     scrollTo: (id, callback) => {
//         var settings = {
//             duration: 1000,
//             easing: {
//                 outQuint: function (x, t, b, c, d) {
//                     return c*((t=t/d-1)*t*t*t*t + 1) + b;
//                 }
//             }
//         };
//         var percentage;
//         var startTime;
//         var node = document.getElementById(id);
//         var nodeTop = node.offsetTop;
//         var nodeHeight = node.offsetHeight;
//         var body = document.body;
//         var html = document.documentElement;
//         var height = Math.max(
//             body.scrollHeight,
//             body.offsetHeight,
//             html.clientHeight,
//             html.scrollHeight,
//             html.offsetHeight
//         );
//         var windowHeight = window.innerHeight
//         var offset = window.pageYOffset;
//         var delta = nodeTop - offset;
//         var bottomScrollableY = height - windowHeight;
//         var targetY = (bottomScrollableY < delta) ?
//             bottomScrollableY - (height - nodeTop - nodeHeight + offset):
//             delta;

//         startTime = Date.now();
//         percentage = 0;

//         if (this.timer) {
//             clearInterval(this.timer);
//         }

//         function step () {
//             var yScroll;
//             var elapsed = Date.now() - startTime;

//             if (elapsed > settings.duration) {
//                 clearTimeout(this.timer);
//             }

//             percentage = elapsed / settings.duration;

//             if (percentage > 1) {
//                 clearTimeout(this.timer);

//                 if (callback) {
//                     callback();
//                 }
//             } else {
//                 yScroll = settings.easing.outQuint(0, elapsed, offset, targetY, settings.duration);
//                 window.scrollTo(0, yScroll);
//                 this.timer = setTimeout(step, 10);     
//             }
//         }

//         this.timer = setTimeout(step, 10);
//     }
// }

// var SmoothScroll = React.createClass({

//     render: function () {
//         return (
//             <div className="smooth-scroll">
//                 <button id="top" onClick={this.handleTopClick}>scroll to bottom</button>
//                 <div className="smooth-scroll--spacer" />
//                 <button id="bottom" onClick={this.handleBottomClick}>scroll to top</button>
//             </div>
//         );
//     },

//     handleTopClick: function () {
//         smoothScroll.scrollTo('bottom');
//     },

//     handleBottomClick: function () {
//         smoothScroll.scrollTo('top');
//     }
// });

// React.render(<App />, document.getElementById('app'));