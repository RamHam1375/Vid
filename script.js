
			class vid{
				constructor(src, canv){
					this.delay = 100;
					this.vidFrames = 32;
					
					this.thumbsList = [];
					
					this.i = 0;
					this.currentFrame = 0;
					
					this.generate = false;
					this.stop = false;
					
					this.video = document.createElement("video");
					this.m = document.getElementById(canv);
					this.mtx = this.m.getContext("2d");
					
					this.m.width = 146;
					this.m.height = 258;
					
					this.video.preload = "metadata";
					this.video.src = src;
					this.video.currentTime = 0;
					
					this.video.addEventListener('loadeddata', this.loader.bind(this));
					this.video.addEventListener('seeked', this.seeker.bind(this));
				}
				
				loader(){
					this.video.currentTime = this.i;
				}
				
				seeker(){
					if(this.generate){
						this.generateThumbnail();
						if (this.i <= this.video.duration) {
							this.video.currentTime = this.i;
						} else {
							this.generate = false;
						}
					} else {
						this.generateFirstThumbnail();
						this.generate = true;
					}
				}
				
				startAnim(){
					if(this.generate){
						this.video.currentTime = this.i;
					}else{
						this.stop = false;
						this.doAnim();
					}
				}
				
				stopAnim(){
					this.stop = true;
					clearTimeout(this.anim);
					this.mtx.drawImage(this.thumbsList[0], 0, 0); 
				}
				
				generateFirstThumbnail() {
					
					var c = document.createElement("canvas");
					var ctx = c.getContext("2d");
					c.width = 146;
					c.height = 258;
					ctx.drawImage(this.video, 0, 0, 146, 258);
					this.thumbsList.push(c); 
					console.log(this.thumbsList[0]);
					this.mtx.drawImage(this.thumbsList[0], 0, 0); 
					this.i += this.video.duration / this.vidFrames;
					
				}
				
				generateThumbnail() {
					var c = document.createElement("canvas");
					var ctx = c.getContext("2d");
					c.width = 146;
					c.height = 258;
					ctx.drawImage(this.video, 0, 0, 146, 258);
					if (this.thumbsList.length === 1) {
						this.doAnim();
					}
					this.thumbsList.push(c); 
					this.i += this.video.duration / this.vidFrames;
				}

				doAnim() {
					this.currentFrame = 0;
					this.anim(); 
				}
				
				anim(){
					if((this.currentFrame + 1) < this.vidFrames && this.stop != true){
						this.mtx.drawImage(this.thumbsList[this.currentFrame], 0, 0); 
						this.currentFrame = (this.currentFrame + 1) % this.thumbsList.length;
						setTimeout(this.anim.bind(this), this.delay); 
					}
				}
			}
			
			var vido = [];
			
			for(let c = 0;c <= 5;c++){
				var src = "a" + (c + 1)+ ".mp4";
				var canv = "canv" + (c + 1);
				vido[c] = new vid(src, canv);
			}
			
			function selectClassToStart(id){
				var num = parseInt(id.charAt(4));
				vido[(num - 1)].startAnim();
			}
			
			function selectClassToStop(id){
				var num = parseInt(id.charAt(4));
				vido[(num - 1)].stopAnim();
			}
			