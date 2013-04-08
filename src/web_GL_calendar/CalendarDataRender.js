/**Class constructor**/
function CalendarDataRender () {
}

/**Compute the data for the brightness of the inner structure blocks**/
CalendarDataRender.prototype.computeInnerBrightnessData = function () {

	/**Get the necessary variables for computing the data**/
	var var_arr = this.initBlockVars('i_a', this.quality);
	var fac = var_arr[0];
	var rL = var_arr[1];
	var sL = var_arr[2]+1;
	var vinc = var_arr[3];
	var year = var_arr[4];
	var month = var_arr[5];
	var cval = var_arr[6];
	var inner_fac = var_arr[7];
	
	/**Compute the offset variable given the animation state**/
	var r_offset = this.getRotationSpeed(this.mouseMoveOffset, inner_fac, fac, this.zoom_setting);
	var vcnt = (this.start[1]*inner_fac*fac)+(this.start[0]*year)+r_offset;

	/**Run the variables through the mathematical function to compute the data**/
	var j = this.start[0];
	var end_j = this.end[0]+1;
	do {
		var day_count = (this.start[1]*fac*inner_fac)+r_offset;
		var k = this.start[1]*fac;
		var end_k = this.end[1]*fac;
		do {
			var rand_alpha = Math.random();
			for(var i = 0; i < inner_fac; i++) {

				vcnt++;
				var spread_size = 3;
				var const_a = i;
				var const_b = vcnt;
				
				if (k%2!=0) {
					continue;
				}
				for (var spread_idx = 0; spread_idx < (spread_size*2)+1; spread_idx++) {
					const_a_s = const_a;//(const_a - spread_size + spread_idx);
					const_b_s = const_b;//(const_b - spread_size + spread_idx);

					/**Generate the point for the calendar box**/
					var vpoint = [];
					vpoint[0] = [
						( Math.cos(day_count/year*cval) * (rL + (sL*Math.cos((const_a_s+r_offset)/month*cval))) ),
						( (sL*Math.sin((const_a_s+r_offset)/month*cval)) + (const_b_s*vinc) ),
						( Math.sin(day_count/year*cval) * (rL + (sL*Math.cos((const_a_s+r_offset)/month*cval))) )];
					vpoint[1] = [
						( Math.cos((day_count-1)/year*cval) * (rL + (sL*Math.cos((const_a_s+r_offset)/month*cval))) ),
						( (sL*Math.sin((const_a_s+r_offset)/month*cval)) + (const_b_s*vinc) ),
						( Math.sin((day_count-1)/year*cval) * (rL + (sL*Math.cos((const_a_s+r_offset)/month*cval))) )];

					var direction_one = Vector.sub(vpoint[1], vpoint[0]);
					var norm_one = Vector.norm(direction_one, 2);
					var unit_one = Vector.scale(2, norm_one);
					vpoint[1] = Vector.add(vpoint[0], unit_one);
					vpoint[0] = Vector.sub(vpoint[0], unit_one);

					vpoint[0] = Vector.add(vpoint[0], [0,2,0]);
					vpoint[1] = Vector.add(vpoint[1], [0,2,0]);

					vpoint[3] = Vector.sub(vpoint[0], [0,4,0]);
					vpoint[2] = Vector.sub(vpoint[1], [0,4,0]);

					for (var d = 0; d < 3; d++) {
						for (var b = 0; b < vpoint[d].length; b++) {
							this.next_vertices[this.vcounter++] = vpoint[d][b];
						}
					}
					for (var d = 0; d < 4; d++) {
						if (d==1) continue;
						for (var b = 0; b < vpoint[d].length; b++) {
							this.next_vertices[this.vcounter++] = vpoint[d][b];
						}
					}

					/**Generate the colour for the calendar box**/
					var calendar_colour_indexes = [[1,0,2], [1,2,3]];
					if (!this.twoD_threeD_shift_on || k!=3) {
						for (var g = 0; g < calendar_colour_indexes.length; g++) {
							for (var p = 0; p < calendar_colour_indexes[g].length; p++) {
								var z = calendar_colour_indexes[g][p];
								this.next_colours[this.ccounter++] = 80;
								this.next_colours[this.ccounter++] = 60;
								this.next_colours[this.ccounter++] = 60;
								this.next_colours[this.ccounter++] = 0.5;
							}
						}
					} else {
						for (var g = 0; g < calendar_colour_indexes.length; g++) {
							for (var p = 0; p < calendar_colour_indexes[g].length; p++) {
								var z = calendar_colour_indexes[g][p];
								this.next_colours[this.ccounter++] = 80;
								this.next_colours[this.ccounter++] = 60;
								this.next_colours[this.ccounter++] = 60;
								this.next_colours[this.ccounter++] = 0.5;
							}
						}				
					}
				}
			}
			day_count+=inner_fac;
		} while (end_k-++k);
	} while (end_j-++j);
}

/**Compute the data for the inner structure blocks**/
CalendarDataRender.prototype.computeInnerStructureData = function () {

	/**Get the necessary variables for computing the data**/
	var var_arr = this.initBlockVars('i_a', this.quality);
	var fac = var_arr[0];
	var rL = var_arr[1];
	var sL = var_arr[2];
	var vinc = var_arr[3];
	var year = var_arr[4];
	var month = var_arr[5];
	var cval = var_arr[6];
	var inner_fac = var_arr[7];
	
	var colour_interval_size = 5;
	var brightness_spread = 20;


	var r_offset = this.getRotationSpeed(this.mouseMoveOffset, inner_fac, fac, this.zoom_setting);
	var vcnt = (this.start[1]*inner_fac*fac)+(this.start[0]*year)+r_offset;
	var j = this.start[0];
	var end_j = this.end[0]+1;
	var brightness_array = new Array();
	var array_size = 0;
	brightness_array[array_size] = new Array(0,0);
	do {
		var day_count = (this.start[1]*fac*inner_fac)+r_offset;
		var k = this.start[1]*fac;
		var end_k = this.end[1]*fac;
		do {
			if(k%colour_interval_size == 0) {
				
				brightness_array[array_size][1] = (Math.random()*0.5);
				colour_picker = Math.floor(
					Math.max(
						0,
						(Math.random()*3) - 0.001
					)
				);
				for(var ii=0; ii < (brightness_spread*2) + 1; ii++) {
					var temp_idx = array_size - brightness_spread + ii;
					
					if (temp_idx < 0) continue;
					brightness_array[temp_idx] = (typeof brightness_array[temp_idx] == 'undefined')
						? new Array(new Array(0, 0, 0), 0): brightness_array[temp_idx];
					
					var normal_x_gaussian = ( ( ii/ (brightness_spread*2) ) * 6 ) - 3;
					var normal_y =          ( 1 / Math.sqrt( 2 * Math.PI ) ) *
										Math.exp( -0.5 * normal_x_gaussian * normal_x_gaussian );
					if(ii == 0 || ii == (brightness_spread*2)) normal_y = 0; 
					normal_y = normal_y/0.4*brightness_array[array_size][1];
					
					var colour_change_percentage = 0.6;
					normal_y_r = normal_y * ((colour_picker-0 == 0) ? 1 : colour_change_percentage);
					normal_y_g = normal_y * ((colour_picker-1 == 0) ? 1 : colour_change_percentage);
   					normal_y_b = normal_y * ((colour_picker-2 == 0) ? 1 : colour_change_percentage);
					
					//normal_y_g = normal_y_r;
					//normal_y_b = normal_y_r;

					brightness_array[temp_idx][0][0] += normal_y_r;
					brightness_array[temp_idx][0][0] = Math.min(1, brightness_array[temp_idx][0][0]);
					brightness_array[temp_idx][0][1] += normal_y_g;
					brightness_array[temp_idx][0][1] = Math.min(1, brightness_array[temp_idx][0][1]);
					brightness_array[temp_idx][0][2] += normal_y_b;
					brightness_array[temp_idx][0][2] = Math.min(1, brightness_array[temp_idx][0][2]);
				}
			}
			array_size++;
		} while (end_k-++k);
	} while (end_j-++j);


	/**Compute the offset variable given the animation state**/
	var r_offset = this.getRotationSpeed(this.mouseMoveOffset, inner_fac, fac, this.zoom_setting);
	var vcnt = (this.start[1]*inner_fac*fac)+(this.start[0]*year)+r_offset;

	/**Run the variables through the mathematical function to compute the data**/
	var j = this.start[0];
	var end_j = this.end[0]+1;
	
	var array_size = 0;
	do {
		var day_count = (this.start[1]*fac*inner_fac)+r_offset;
		var k = this.start[1]*fac;
		var end_k = this.end[1]*fac;
		do {
			var left_brt = brightness_array[array_size][0];
			var right_brt = array_size+1 < brightness_array.length ? brightness_array[array_size+1][0] : brightness_array[array_size][0];
			for(var i = 0; i < inner_fac; i++) {
				vcnt++;

				/**Create the points to be rendered**/
				this.computeHelicalSpringTorus(day_count/year*cval, i/month*cval, rL, sL, vcnt*vinc);
				this.computeHelicalSpringTorus((day_count+inner_fac)/year*cval, i/month*cval, rL, sL, (vcnt+inner_fac)*vinc);
				this.computeHelicalSpringTorus((day_count+1)/year*cval, (i+1)/month*cval, rL, sL, (vcnt+1)*vinc);
				this.computeHelicalSpringTorus((day_count+inner_fac+1)/year*cval, (i+1)/month*cval, rL, sL, (vcnt+inner_fac+1)*vinc);
				
				/**Create the colour for the points**/
				this.computeHelicalSpringTorusInnerColor(right_brt, left_brt);
			}
			day_count+=inner_fac;
			array_size++;
		} while (end_k-++k);
	} while (end_j-++j);
}

/**Compute the data for the calendar blocks**/
CalendarDataRender.prototype.computeCalendarData = function (startCol,endCol) {

	/**Initialize the variables for the mathematical function**/
	var var_arr = this.initBlockVars('c');

	var fac = var_arr[0];
	var rL = var_arr[1];
	var sL = var_arr[2];
	var vinc = var_arr[3];
	var year = var_arr[4];
	var month = var_arr[5];
	var cval = var_arr[6];
	var inner_fac = var_arr[7];
	
	/**Compute the offset variable given the animation state**/
	var r_offset = this.getRotationSpeed(this.mouseMoveOffset, inner_fac, fac, this.zoom_setting);
	var vcnt = (this.start[1]*inner_fac*fac)+(this.start[0]*year)+r_offset;

	/**Compute the variables for creating the colour alternations
	 * between the two specified colours given at input**/
	var col_diff = new Array(endCol[0]-startCol[0], endCol[1]-startCol[1], endCol[2]-startCol[2]);
	var val_diff = Math.abs(vcnt - ( (this.end[1]*inner_fac*fac)+(this.end[0]*year) ));
	var col_inc = new Array(col_diff[0]/val_diff, col_diff[1]/val_diff, col_diff[2]/val_diff);
	var col_count = 0;

	/**Generate the correspondnig data for rendering using the mathematical function**/
	var j = this.start[0];
	var end_j = this.end[0] + 1;
	do {
		var day_count = (this.start[1]*fac*inner_fac)+r_offset;
		var k = this.start[1]*fac;
		var end_k = this.end[1]*fac;
		do {
			var i = 0;
			do {
				vcnt++;
				day_count++;
				
				/**Generate the point for the calendar box**/
				var vpoint = [];
				vpoint[0] = [
					( Math.cos(day_count/year*cval) * (rL + (sL*Math.cos((i+r_offset)/month*cval))) ),
					( (sL*Math.sin((i+r_offset)/month*cval)) + (vcnt*vinc) ),
					( Math.sin(day_count/year*cval) * (rL + (sL*Math.cos((i+r_offset)/month*cval))) )];
				vpoint[1] = [
					( Math.cos((day_count-1)/year*cval) * (rL + (sL*Math.cos((i+r_offset)/month*cval))) ),
					( (sL*Math.sin((i+r_offset)/month*cval)) + (vcnt*vinc) ),
					( Math.sin((day_count-1)/year*cval) * (rL + (sL*Math.cos((i+r_offset)/month*cval))) )];

				var direction_one = Vector.sub(vpoint[1], vpoint[0]);
				var norm_one = Vector.norm(direction_one, 2);
				var unit_one = Vector.scale(2, norm_one);
				vpoint[1] = Vector.add(vpoint[0], unit_one);
				vpoint[0] = Vector.sub(vpoint[0], unit_one);

				vpoint[0] = Vector.add(vpoint[0], [0,2,0]);
				vpoint[1] = Vector.add(vpoint[1], [0,2,0]);

				vpoint[3] = Vector.sub(vpoint[0], [0,4,0]);
				vpoint[2] = Vector.sub(vpoint[1], [0,4,0]);

				for (var d = 0; d < 3; d++) {
					for (var b = 0; b < vpoint[d].length; b++) {
						this.next_vertices[this.vcounter++] = vpoint[d][b];
					}
				}
				for (var d = 0; d < 4; d++) {
					if (d==1) continue;
					for (var b = 0; b < vpoint[d].length; b++) {
						this.next_vertices[this.vcounter++] = vpoint[d][b];
					}
				}

				/**Generate the colour for the calendar box**/
				var calendar_colour_indexes = [[1,0,2], [1,2,3]];
				if (!this.twoD_threeD_shift_on || k!=3) {
					for (var g = 0; g < calendar_colour_indexes.length; g++) {
						for (var p = 0; p < calendar_colour_indexes[g].length; p++) {
							var z = calendar_colour_indexes[g][p];
							this.next_colours[this.ccounter++] = i==29?0:(startCol[0]+(col_inc[0]*col_count)) *(z+1);
							this.next_colours[this.ccounter++] = (startCol[1]+(col_inc[1]*col_count)) *(z+1);
							this.next_colours[this.ccounter++] = i==29?0:(startCol[2]+(col_inc[2]*col_count));
							this.next_colours[this.ccounter++] = 1;
						}
					}
				} else {
					for (var g = 0; g < calendar_colour_indexes.length; g++) {
						for (var p = 0; p < calendar_colour_indexes[g].length; p++) {
							var z = calendar_colour_indexes[g][p];
							this.next_colours[this.ccounter++] = i==29 ? 0 : (87/255);
							this.next_colours[this.ccounter++] = i==29 ? (startCol[1]+(col_inc[1]*col_count)) *(z+1) : (137/255);
							this.next_colours[this.ccounter++] = i==29 ? 0 : (107/255);
							this.next_colours[this.ccounter++] = 1;
						}
					}				
				}
				
				/**Draw a standard calendar if control is specified**/
				if (this.twoD_threeD_shift > 0 && k==3 && j==6) {
					if (this.twoD_threeD_shift < 0.9) {
						vpoint[0] = Vector.add(
										Vector.scale(this.twoD_threeD_shift, [
											-22.5+((i%7)*6.5),
											473 - (parseInt(i/7)*3.5),
											80+2+parseInt(2*i/7)
											]),
										Vector.scale(1-this.twoD_threeD_shift, vpoint[0])
									);
						vpoint[1] = Vector.add(
										Vector.scale(this.twoD_threeD_shift, [
											-22.5+((i%7)*6.5) + 5.5,
											473 - (parseInt(i/7)*3.5),
											80+2+parseInt(2*i/7)
											]),
										Vector.scale(1-this.twoD_threeD_shift, vpoint[1])
									);
						vpoint[2] = Vector.add(
										Vector.scale(this.twoD_threeD_shift, [
											-22.5+((i%7)*6.5) + 5.5,
											473 - (parseInt(i/7)*3.5) + 3.2,
											80+parseInt(2*i/7)
											]),
										Vector.scale(1-this.twoD_threeD_shift, vpoint[2])
									);
						vpoint[3] = Vector.add(
										Vector.scale(this.twoD_threeD_shift, [
											-22.5+((i%7)*6.5),
											473 - (parseInt(i/7)*3.5) + 3.2,
											80+parseInt(2*i/7)
											]),
										Vector.scale(1-this.twoD_threeD_shift, vpoint[3])
									);
									
						for (var g = 0; g < calendar_colour_indexes.length; g++) {
							for (var p = 0; p < calendar_colour_indexes[g].length; p++) {
								var z = calendar_colour_indexes[g][p];
								this.next_colours[this.ccounter++] = i==29?0:(startCol[0]+(col_inc[0]*col_count)) *(z+1);
								this.next_colours[this.ccounter++] = (startCol[1]+(col_inc[1]*col_count)) *(z+1);
								this.next_colours[this.ccounter++] = i==29?0:(startCol[2]+(col_inc[2]*col_count));
								this.next_colours[this.ccounter++] = 1;
							}
						}
						
						for (var d = 0; d < 3; d++) {
							for (var b = 0; b < vpoint[d].length; b++) {
								this.next_vertices[this.vcounter++] = vpoint[d][b];
							}
						}
						for (var d = 0; d < 4; d++) {
							if (d==1) continue;
							for (var b = 0; b < vpoint[d].length; b++) {
								this.next_vertices[this.vcounter++] = vpoint[d][b];
							}
						}
					}
				}
				col_count++;
				
				/**Store the happiness value (TODO: make sure its is not random)**/
				this.happy_values[this.total_day_counter++] = Math.min(Math.random(),Math.random());
				
			} while (inner_fac-++i);
		} while (end_k-++k);
	} while (end_j-++j);
}

CalendarDataRender.prototype.computeBrightnessClouds = function () {

	/**Initialize the variables for the mathematical function**/
	var var_arr = this.initBlockVars('cc');

	var fac = var_arr[0];
	var rL = var_arr[1];
	var sL = var_arr[2];
	var vinc = var_arr[3];
	var year = var_arr[4];
	var month = var_arr[5];
	var cval = var_arr[6];
	var inner_fac = var_arr[7];
	

	/**Compute the offset variable given the animation state**/
	var r_offset = this.getRotationSpeed(this.mouseMoveOffset, inner_fac, fac, this.zoom_setting);
	var vcnt = (this.start[1]*inner_fac*fac)+(this.start[0]*year)+r_offset;

	/**Generate the correspondnig data for rendering using the mathematical function**/
	var j = this.start[0];
	var end_j = this.end[0] + 1;
	do {
		var day_count = (this.start[1]*fac*inner_fac)+r_offset;
		var next_cloud_count = 0;
		
		/**Compute the data per month**/
		var k = this.start[1]*fac;
		var end_k = this.end[1]*fac;
		do {
			next_cloud_count++;
			/**Compute data per day**/
			var i = 0;
			do {
				vcnt++;
				day_count++;
				
				if (next_cloud_count > 15) {
					next_cloud_count = 0;
					
					/**Get the center point to center the box on**/
					var center_point = [
						( Math.cos(day_count/year*cval) * (rL + (sL*Math.cos(i/month*cval))) ),
						( (sL*Math.sin(i/month*cval)) + (vcnt*vinc) ) +5,
						( Math.sin(day_count/year*cval) * (rL + (sL*Math.cos(i/month*cval))) ) + 3];
					
					var size = 0.5 + Math.random();					
					var radius = 1.3*size;


					/**Draw the background of the circle**/
					this.drawCircle(
					  10, radius,
					  center_point,
					  circle_colour_diff,
					  colour_type,
					  true
					);
					
				}
			} while (inner_fac-++i);
		} while (end_k-++k);
	} while (end_j-++j);
}


/**Compute the data for the clouds**/
CalendarDataRender.prototype.computeCloudData = function () {

	/**Initialize the variables for the mathematical function**/
	var var_arr = this.initBlockVars('cc');

	var fac = var_arr[0];
	var rL = var_arr[1];
	var sL = var_arr[2];
	var vinc = var_arr[3];
	var year = var_arr[4];
	var month = var_arr[5];
	var cval = var_arr[6];
	var inner_fac = var_arr[7];
	

	/**Compute the offset variable given the animation state**/
	var r_offset = this.getRotationSpeed(this.mouseMoveOffset, inner_fac, fac, this.zoom_setting);
	var vcnt = (this.start[1]*inner_fac*fac)+(this.start[0]*year)+r_offset;

	/**Generate the correspondnig data for rendering using the mathematical function**/
	var j = this.start[0];
	var end_j = this.end[0] + 1;
	do {
		var day_count = (this.start[1]*fac*inner_fac)+r_offset;
		var next_cloud_count = 0;
		
		/**Compute the data per month**/
		var k = this.start[1]*fac;
		var end_k = this.end[1]*fac;
		do {
			next_cloud_count++;
			/**Compute data per day**/
			var i = 0;
			do {
				vcnt++;
				day_count++;
				
				if (next_cloud_count > 15) {
					next_cloud_count = 0;
					
					/**Get the center point to center the box on**/
					var center_point = [
						( Math.cos(day_count/year*cval) * (rL + (sL*Math.cos(i/month*cval))) ),
						( (sL*Math.sin(i/month*cval)) + (vcnt*vinc) ) +5,
						( Math.sin(day_count/year*cval) * (rL + (sL*Math.cos(i/month*cval))) ) + 3];
					var cx = center_point[0];
					var cy = center_point[1];
					
					var size = 0.5 + Math.random();
					
					var radius = 1.3*size;
					
					/**Horizontal dimensions**/
					var box_width = 12*size;
					var sx = cx-(box_width/2);
					var ex = cx+(box_width/2);

					/**Vertical dimensions**/
					var box_height = 8*size;
					var sy = cy-(box_height/2);
					var ey = cy+(box_height/2);
					
					var circle_colour_diff = Math.random()/6;
					var colour_type = Math.min(3, Math.floor(  (Math.random()*3)+1  ) );
					/**Draw the set of circles**/
					for (var w = 0; w < 70; w++) {
					
						if (w%4==0) {
							cx = center_point[0] +15 - box_width  + (box_width* 2*Math.random());
							cy = center_point[1] - box_height + (box_height*2*Math.random());
						}
					
						/**Generate the first potential point**/
						var p_x = sx + ( Math.random() * box_width );
						var p_y = sy + ( Math.random() * box_height );
						var dist_1 = Math.sqrt( ((p_x-cx)*(p_x-cx)) + ((p_y-cy)*(p_y-cy)) );
						var origin_dist_1 = Math.sqrt( ((p_x-center_point[0])*(p_x-center_point[0])) + ((p_y-center_point[1])*(p_y-center_point[1])) );
						
						/**Generate the second potential point**/
						var p_x2 = sx + ( Math.random() * box_width );
						var p_y2 = sy + ( Math.random() * box_height );
						var dist_2 = Math.sqrt( ((p_x2-cx)*(p_x2-cx)) + ((p_y2-cy)*(p_y2-cy)) )
						var origin_dist_2 = Math.sqrt( ((p_x2-center_point[0])*(p_x2-center_point[0])) + ((p_y2-center_point[1])*(p_y2-center_point[1])) );
						
						
						var dist_used = ( dist_2 > dist_1 ) ? origin_dist_1 : origin_dist_2;
						
						/**Pick the closest of the two point**/
						var next_point = ( dist_2 > dist_1 ) ?
										 [ p_x, p_y, center_point[2] - (dist_used/50) ] :
										 [ p_x2, p_y2, center_point[2] - (dist_used/50) ];

						/**Adjust the position on the y-axis**/
						next_point[1] -= (box_height/2);
						
						
						
						/**Alternate the radius slightly**/
						var random_radius = radius - (radius/4) + ( (radius/4) * Math.random() );
						random_radius = Math.max(random_radius*0.1, random_radius-(dist_used/box_width*radius));

						/**Draw the background of the circle**/
						this.drawCircle(
						  10, random_radius*1.1,
						  next_point,
						  circle_colour_diff,
						  colour_type,
						  true
						);
						/**Draw the circle at the next point**/
						this.drawCircle(
						  10, random_radius,
						  next_point,
						  circle_colour_diff,
						  colour_type,
						  false
						);
					}
				}
			} while (inner_fac-++i);
		} while (end_k-++k);
	} while (end_j-++j);
}
/**Draw a circle given the required parameters**/
CalendarDataRender.prototype.drawCircle = function (sides, radius, cen, circle_colour_diff, activity_type, background) {
	
	/**Multiplier for creating a black colour for the background**/
	bc_mult = 1;
	if (background) {
		bc_mult = 0;
	}
	
	/**Initialize the colours to use**/
	var colour_flags = [0,1,1];//activity_type = 1;
	var cr = 1; var cg = 1; var cb = 1;
	if (activity_type == 'professional' || activity_type == 1) {
		colour_flags  = [0,1,1];
		cr = 1-circle_colour_diff;
	}
	if (activity_type == 'personal' || activity_type == 2) {
		colour_flags  = [0.7,0,1];
		cg = 1-circle_colour_diff;
	}
	if (activity_type == 'social' || activity_type == 3) {
		colour_flags  = [1,1,0];
		cb = 1-circle_colour_diff;
	}

	/**Randomize the colours a bit more**/
	var rand = (Math.random()/5);	
	cr -= (colour_flags[0]*rand);
	cr *= bc_mult;
    rand = (Math.random()/5);
	cg -= (colour_flags[1]*rand);
	cg  *= bc_mult;
	rand = (Math.random()/5);
	cb -= (colour_flags[2]*rand);
	cb  *= bc_mult;
	
	var colour_rand_fac = 2;//.5;
	var alpha = 1;
	
	/**Draw the circle**/
	var pheta = 0;
	for (var cp = 0; cp < sides-1; cp++) {
	
		// First point
		this.next_vertices[this.vcounter++] = (radius*Math.cos(pheta/180*Math.PI))+cen[0];
		this.next_vertices[this.vcounter++] = (radius*Math.sin(pheta/180*Math.PI))+cen[1];
		this.next_vertices[this.vcounter++] = cen[2];
		
		rand = (Math.random()/colour_rand_fac);
		this.next_colours[this.ccounter++] = ( cr - (colour_flags[0]*rand) )  * bc_mult;
		rand = (Math.random()/colour_rand_fac);
		this.next_colours[this.ccounter++] = ( cg - (colour_flags[1]*rand) )  * bc_mult;
		rand = (Math.random()/colour_rand_fac);
		this.next_colours[this.ccounter++] = ( cb - (colour_flags[2]*rand) )  * bc_mult;

		this.next_colours[this.ccounter++] = alpha;
		
		// Second point
		pheta += 360/sides;
		this.next_vertices[this.vcounter++] = (radius*Math.cos(pheta/180*Math.PI))+cen[0];
		this.next_vertices[this.vcounter++] = (radius*Math.sin(pheta/180*Math.PI))+cen[1];
		this.next_vertices[this.vcounter++] = cen[2];

		rand = (Math.random()/colour_rand_fac);
		this.next_colours[this.ccounter++] = ( cr - (colour_flags[0]*rand) )  * bc_mult;
		rand = (Math.random()/colour_rand_fac);
		this.next_colours[this.ccounter++] = ( cg - (colour_flags[1]*rand) )  * bc_mult;
		rand = (Math.random()/colour_rand_fac);
		this.next_colours[this.ccounter++] = ( cb - (colour_flags[2]*rand) )  * bc_mult;
		this.next_colours[this.ccounter++] = alpha;
		
		// Third point
		this.next_vertices[this.vcounter++] = cen[0];
		this.next_vertices[this.vcounter++] = cen[1];
		this.next_vertices[this.vcounter++] = cen[2];
		
		this.next_colours[this.ccounter++] = cr * bc_mult;
		this.next_colours[this.ccounter++] = cg * bc_mult;
		this.next_colours[this.ccounter++] = cb * bc_mult;
		this.next_colours[this.ccounter++] = alpha;
	}
	
	// First point		
	this.next_vertices[this.vcounter++] = (radius*Math.cos(pheta/180*Math.PI))+cen[0];
	this.next_vertices[this.vcounter++] = (radius*Math.sin(pheta/180*Math.PI))+cen[1];
	this.next_vertices[this.vcounter++] = cen[2];
	
	rand = (Math.random()/colour_rand_fac);
	this.next_colours[this.ccounter++] = ( cr - colour_flags[0]*rand )  * bc_mult;
	rand = (Math.random()/colour_rand_fac);
	this.next_colours[this.ccounter++] = ( cg - colour_flags[1]*rand )  * bc_mult;
	rand = (Math.random()/colour_rand_fac);
	this.next_colours[this.ccounter++] = ( cb - colour_flags[2]*rand )  * bc_mult;
	this.next_colours[this.ccounter++] = alpha;

	// Second point
	pheta += 360/sides;
	this.next_vertices[this.vcounter++] = (radius*Math.cos(pheta/180*Math.PI))+cen[0];
	this.next_vertices[this.vcounter++] = (radius*Math.sin(pheta/180*Math.PI))+cen[1];
	this.next_vertices[this.vcounter++] = cen[2];
	
	rand = (Math.random()/colour_rand_fac);
	this.next_colours[this.ccounter++] = ( cr - (colour_flags[0]*rand) )  * bc_mult;
	rand = (Math.random()/colour_rand_fac);
	this.next_colours[this.ccounter++] = ( cg - (colour_flags[1]*rand) )  * bc_mult;
	rand = (Math.random()/colour_rand_fac);
	this.next_colours[this.ccounter++] = ( cb - (colour_flags[2]*rand) )  * bc_mult;
	this.next_colours[this.ccounter++] = alpha;

	// Third point
	this.next_vertices[this.vcounter++] = cen[0];
	this.next_vertices[this.vcounter++] = cen[1];
	this.next_vertices[this.vcounter++] = cen[2];
	
	this.next_colours[this.ccounter++] = cr * bc_mult;
	this.next_colours[this.ccounter++] = cg * bc_mult;
	this.next_colours[this.ccounter++] = cb * bc_mult;
	this.next_colours[this.ccounter++] = alpha;
}

/**Draw the outer structure, with alpha**/
CalendarDataRender.prototype.computeOuterStructureData = function () {

	/**Initialize the variables for the mathematical function**/
	var var_arr = this.initBlockVars('o_a', this.quality);
	var fac = var_arr[0];
	var rL = var_arr[1];
	var sL = var_arr[2];
	var vinc = var_arr[3];
	var year = var_arr[4];
	var month = var_arr[5];
	var cval = var_arr[6];
	var inner_fac = var_arr[7];
	
	/**Compute the offset variable given the animation state**/
	var r_offset = this.getRotationSpeed(this.mouseMoveOffset, inner_fac, fac, this.zoom_setting);
	vcnt = (this.start[1]*inner_fac*fac)+(this.start[0]*year) + r_offset;
	
	/**Generate the correspondnig data for rendering using the mathematical function**/
	var j = this.start[0];
	var end_j = this.end[0]+1;
	do {
		var day_count = (this.start[1]*fac*inner_fac) + r_offset;
		var k = this.start[1]*fac;
		var end_k = this.end[1]*fac;
		do {
			var i = 0;
			do {
				day_count++;
				vcnt++;
				/**Create the points to be rendered**/
				this.computeHelicalSpringTorus(day_count/year*cval, i/month*cval, rL, sL, vcnt*vinc);
				this.computeHelicalSpringTorus((day_count+inner_fac)/year*cval, i/month*cval, rL, sL, (vcnt+inner_fac)*vinc);
				this.computeHelicalSpringTorus((day_count+1)/year*cval, (i+1)/month*cval, rL, sL, (vcnt+1)*vinc);
				this.computeHelicalSpringTorus((day_count+inner_fac+1)/year*cval, (i+1)/month*cval, rL, sL, (vcnt+inner_fac+1)*vinc);
				/**Create the colour for the points**/
				this.computeHelicalSpringTorusOuterColor();/**var line1 = Vector.sub(vpoint[1],vpoint[0]);var line2 = Vector.sub(vpoint[2],vpoint[0]);var normal = Vector.cross(line1, line2);for (var d = 0; d < 4; d++) {for (var b = 0; b < normal.length; b++) {this.next_normals[this.ncounter++] = normal[b];}}**/	
			} while (inner_fac-++i);
		} while (end_k-++k);
	} while (end_j-++j);
}

/**Draw the outer,textured structure**/
CalendarDataRender.prototype.computeTextureStructureData = function () {

	/**Initialize the variables for the mathematical function**/
	var var_arr = this.initBlockVars('o');
    var fac = var_arr[0];
    var rL = var_arr[1];
    var sL = var_arr[2];
    var vinc = var_arr[3];
    var year = var_arr[4];
    var month = var_arr[5];
    var cval = var_arr[6];
    var inner_fac = var_arr[7];
	
	/**Compute the offset variable given the animation state**/
	var r_offset = this.getRotationSpeed(this.mouseMoveOffset, inner_fac, fac, this.zoom_setting);
	vcnt = r_offset + (12*fac*inner_fac*2);

	var j = 3;
    do {
        var day_count = r_offset;
		var k = 0;
        do {
			var i = 0;
            do {
                vcnt++;
                day_count++;

				/**Create the points to be rendered**/
				var vpoint = [];
				vpoint[0] = [
					( Math.cos(day_count/year*cval) * (rL + (sL*Math.cos(i/month*cval))) ),
					( (sL*Math.sin(i/month*cval)) + (vcnt*vinc) ),
					( Math.sin(day_count/year*cval) * (rL + (sL*Math.cos(i/month*cval))) )];
				vpoint[1] = [
					( Math.cos((day_count+inner_fac)/year*cval) * (rL + (sL*Math.cos(i/month*cval))) ),
					( (sL*Math.sin(i/month*cval)) + (vcnt*vinc) ),
					( Math.sin((day_count+inner_fac)/year*cval) * (rL + (sL*Math.cos(i/month*cval))) )];
				vpoint[3] = [
					( Math.cos((day_count+1)/year*cval) * (rL + (sL*Math.cos((i+1)/month*cval))) ),
					( (sL*Math.sin((i+1)/month*cval)) + (vcnt*vinc) ),
					( Math.sin((day_count+1)/year*cval) * (rL + (sL*Math.cos((i+1)/month*cval))) )];
				vpoint[2] = [
					( Math.cos((day_count+inner_fac+1)/year*cval) * (rL + (sL*Math.cos((i+1)/month*cval))) ),
					( (sL*Math.sin((i+1)/month*cval)) + (vcnt*vinc) ),
					( Math.sin((day_count+inner_fac+1)/year*cval) * (rL + (sL*Math.cos((i+1)/month*cval))) )];

				var direction_one = Vector.sub(vpoint[2], vpoint[1]);
				var norm_one = Vector.norm(direction_one, 2);
				var unit_one = Vector.scale(2, norm_one);
				vpoint[2] = Vector.add(vpoint[1], unit_one);
				vpoint[3] = Vector.add(vpoint[0], unit_one);

				var direction_three = Vector.sub(vpoint[1], vpoint[0]);
				var norm_three = Vector.norm(direction_three, 2);
				var unit_three = Vector.scale(2, norm_three);
				vpoint[1] = Vector.add(vpoint[0], unit_three);
				vpoint[2] = Vector.add(vpoint[3], unit_three);
			
				this.next_vertices[this.vcounter++] = vpoint[0][0];
				this.next_vertices[this.vcounter++] = vpoint[0][1];
				this.next_vertices[this.vcounter++] = vpoint[0][2];
				
				this.next_vertices[this.vcounter++] = vpoint[1][0];
				this.next_vertices[this.vcounter++] = vpoint[1][1];
				this.next_vertices[this.vcounter++] = vpoint[1][2];
				
				this.next_vertices[this.vcounter++] = vpoint[2][0];
				this.next_vertices[this.vcounter++] = vpoint[2][1];
				this.next_vertices[this.vcounter++] = vpoint[2][2];

				this.next_vertices[this.vcounter++] = vpoint[0][0];
				this.next_vertices[this.vcounter++] = vpoint[0][1];
				this.next_vertices[this.vcounter++] = vpoint[0][2];
		
				this.next_vertices[this.vcounter++] = vpoint[2][0];
				this.next_vertices[this.vcounter++] = vpoint[2][1];
				this.next_vertices[this.vcounter++] = vpoint[2][2];
				
				this.next_vertices[this.vcounter++] = vpoint[3][0];
				this.next_vertices[this.vcounter++] = vpoint[3][1];
				this.next_vertices[this.vcounter++] = vpoint[3][2];

				/**Create the colour for the points**/
                this.computeHelicalSpringTorusTextureColor();
            } while (inner_fac-++i);
        } while ((12*fac)-++k);
    } while (10-++j);
}

/**Compute the color values for the next four vertexes for the inner structure**/
CalendarDataRender.prototype.computeHelicalSpringTorusInnerColor = function (leftIntensity, rightIntensity) {
	
	var three_color_variation = 1;
	
	
	var red = (1== three_color_variation ? 1 : 1);
	var green = (1== three_color_variation ? 0.8 : 0.8);
	var blue = (1== three_color_variation ? 0.7 : 0.7);
	var pow_var = 1;
	
	
	this.next_colours[this.ccounter++] = red * Math.pow(rightIntensity[0],pow_var);
	this.next_colours[this.ccounter++] = green * (1== three_color_variation ? rightIntensity[1] : 1);
	this.next_colours[this.ccounter++] = blue   * (1== three_color_variation ? rightIntensity[2] : 1);
	this.next_colours[this.ccounter++] = 1;

	this.next_colours[this.ccounter++] = red * Math.pow(leftIntensity[0],pow_var);
	this.next_colours[this.ccounter++] = green * (1== three_color_variation ? leftIntensity[1] : 1);
	this.next_colours[this.ccounter++] = blue   * (1== three_color_variation ? leftIntensity[2] : 1);
	this.next_colours[this.ccounter++] = 1;

	this.next_colours[this.ccounter++] = red * Math.pow(rightIntensity[0],pow_var);
	this.next_colours[this.ccounter++] = green * (1== three_color_variation ? rightIntensity[1] : 1);
	this.next_colours[this.ccounter++] = blue   * (1== three_color_variation ? rightIntensity[2] : 1);
	this.next_colours[this.ccounter++] = 1;
	
	this.next_colours[this.ccounter++] = red * Math.pow(leftIntensity[0],pow_var);
	this.next_colours[this.ccounter++] = green * (1== three_color_variation ? leftIntensity[1] : 1);
	this.next_colours[this.ccounter++] = blue   * (1== three_color_variation ? leftIntensity[2] : 1);
	this.next_colours[this.ccounter++] = 1;
}

/**Compute the color values for the next four vertexes for the inner structure**/
CalendarDataRender.prototype.computeHelicalSpringTorusInnerBrightnessColor = function (randomAlpha, cur_section, max_sections) {

	var normal_x_gaussian =          ( cur_section/ max_sections * 2 ) - 1;
	var normal_x_gaussian_plus_one = ( (cur_section+1) / max_sections * 2 ) - 1;
    
    var normal_y =          ( 1 / Math.sqrt( 2 * Math.PI ) ) * Math.exp( -0.5 * normal_x_gaussian * normal_x_gaussian );
	var normal_y_plus_one = ( 1 / Math.sqrt( 2 * Math.PI ) ) * Math.exp( -0.5 * normal_x_gaussian_plus_one * normal_x_gaussian_plus_one );

	normal_y /= 0.4;
	normal_y_plus_one /= 0.4;
	//normal_y *= randomAlpha;
	//normal_y_plus_one *= randomAlpha;
	for (var i = 0; i < 4; i++) {
		this.next_colours[this.ccounter++] = 0.5;   //0.500;
		this.next_colours[this.ccounter++] = 0.1;  //0.100;
		this.next_colours[this.ccounter++] = 0.1;  //0.075;
		this.next_colours[this.ccounter++] = (i < 2) ? normal_y : normal_y_plus_one;   //0.800;
	}
}

/**Compute the color values for the next four vertexes for the outer structure**/
CalendarDataRender.prototype.computeHelicalSpringTorusOuterColor = function () {
	var b = 3;
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 0.3;
	
	var b = 2;
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 0.3;
	
	var b = 1;
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 0.3;
	
	var b = 0;
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 0.3;
}

/**Compute the color values for the next four vertexes for the textured structure**/
CalendarDataRender.prototype.computeHelicalSpringTorusTextureColor = function () {
	var b = 2;
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 1;

	var b = 1;
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 1;

	var b = 0;
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 1;

	var b = 2;
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 1;

	var b = 0;
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 1;

	var b = 1;
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 1 - (0.15*(b+1));
	this.next_colours[this.ccounter++] = 1;

}
					
/**Compute the vertex value using the math function**/
CalendarDataRender.prototype.computeHelicalSpringTorus = function (a, b, l, s, y) {
	this.next_vertices[this.vcounter++] = Math.cos(a) * (l + (s*Math.cos(b)));
	this.next_vertices[this.vcounter++] = (s*Math.sin(b)) + y;
	this.next_vertices[this.vcounter++] = Math.sin(a) * (l + (s*Math.cos(b)));
}

/**Get the speed at which the object should rotate**/
CalendarDataRender.prototype.getRotationSpeed = function (offset, inner_fac, fac, zoom_value) {
	var directional_offset = offset < 0 ? -inner_fac : 0;
	if (zoom_value == 2) {
		return ( ( -0.0033*offset*fac*inner_fac ) % inner_fac ) + directional_offset;
	} else if (zoom_value == 1) {
		return ( -0.015*offset*fac*inner_fac ) % inner_fac;
	}
}

/**Initialize the appropriate variables for
 * rendering inner, outer, or calendar blocks**/
CalendarDataRender.prototype.initBlockVars = function (type, quality) {
	if(type == 'c') {
		var fac = 1;
		var inner_fac = 30;

		var rL = 55;
		var sL = 20.2;
		var vinc = (6.0/fac)/inner_fac;

		var year = 12.0*fac*inner_fac;
		var month = inner_fac;

		var cval = 2*Math.PI;

		return [fac, rL, sL, vinc, year, month, cval, inner_fac];
	}
	if(type == 'i_a') {
		var fac = 30;
		var inner_fac = 10;

		var rL = 55;
		var sL = 8.2;
		var vinc = (6.0/fac)/inner_fac;

		var year = 12.0*fac*inner_fac;
		var month = inner_fac;

		var cval = 2*Math.PI;

		return [fac, rL, sL, vinc, year, month, cval, inner_fac];
	}
	if(type == 'o_a') {
		var fac = 10;
		var inner_fac = 30;
		if(quality == 2) {
			fac = 4;//8;//4;
			inner_fac = 15;//30;//15;
		}
		if(quality == 3) {
			fac = 3;
			inner_fac = 10;
		}

		var rL = 55;
		var sL = 16.2;//18.2;
		var vinc = (6.0/fac)/inner_fac;

		var year = 12.0*fac*inner_fac;
		var month = inner_fac;

		var cval = 2*Math.PI;

		return [fac, rL, sL, vinc, year, month, cval, inner_fac];
	}
	if(type == 'cc') {
		var fac = 30;
		var inner_fac = 2;

		var rL = 55;
		var sL = 1;
		var vinc = (6.0/fac)/inner_fac;

		var year = 12.0*fac*inner_fac;
		var month = inner_fac;

		var cval = 2*Math.PI;

		return [fac, rL, sL, vinc, year, month, cval, inner_fac];
	}
	if(type == 'o') {
		var fac = 12;
		var inner_fac = 30;

		var rL = 55;
		var sL = 16.2;//18.2;
		var vinc = (6.0/fac)/inner_fac;

		var year = 12.0*fac*inner_fac;
		var month = inner_fac;

		var cval = 2*Math.PI;

		return [fac, rL, sL, vinc, year, month, cval, inner_fac];
	}
}