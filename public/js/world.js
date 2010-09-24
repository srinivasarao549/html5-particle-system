var world = function(options, callbacks) {
	var defaults = {
		canvasEl: document.getElementsByTagName("canvas")[0],
		clearEachFrame: true,
		fullWindow: false,
		speed: 66, // 15 FPS
		initialParticles: 1000
	};
	var defaultCallbacks = {
		worldUpdated: function() { }
	};
	console.log(defaults, options);
	
	this.options = _.extend({}, defaults, options); // merge options and defaults
	this.callbacks = _.extend({}, defaultCallbacks, callbacks); // merge callbacks and defaults
	
	this.canvas = this.options.canvasEl;
	this.context = this.canvas.getContext("2d");
	this.clearEachFrame = this.options.clearEachFrame;

	
	var self = this;
	if (this.fullWindow) {
		this.resize(window.innerWidth-20, window.innerHeight-20);
		window.addEventListener("resize", function() {
			self.resize(window.innerWidth-20, window.innerHeight-10);
		}, false);
	}
	
	this.ps = new particleSystem(this, options.initialParticles);
	
	setInterval(function() {
        self.update.call(self);
    }, self.options.speed);
};

world.prototype.update = function() {
    this.ps.update();
    this.draw();
};

world.prototype.draw = function() {
	if (this.clearEachFrame) {
		this.clear();
	}
    this.ps.draw();
};

world.prototype.clear = function() {
	this.context.clearRect(0, 0, this.canvas.width,this.canvas.height);
};

world.prototype.toggleClearEachFrame = function() {
	this.clear();
	this.clearEachFrame = !this.clearEachFrame;
};

world.prototype.resize = function(width, height) {
	this.canvas.width = width;
	this.canvas.height = height;
	this.clear();
};

