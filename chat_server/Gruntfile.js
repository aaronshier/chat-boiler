module.exports = function(grunt){
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// Sass Task

		sass: {
			dev: {
				options: {
					style: 'expanded',
					sourcemap: 'none',
				},
				files: {
					'compiled/style.human.css': 'src/sass/styles.scss'
				}
			},
			dist: {
				options: {
					style: 'compressed',
					sourcemap: 'none',
				},
				files: {
					'public/css/style.min.css': 'src/sass/styles.scss'
				}
			}
		},

		// autoprefixer

		autoprefixer: {
	        options: {
	          	browsers: ['last 20 versions']            
	        },
			multiple_files: {
				expand: true,
				flatten: true,
				src: 'compiled/*.css',
				dest:''
			}
		},

		// Watch Task

		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass','autoprefixer']
			}
		}

	})

	grunt.loadNpmTasks('grunt-contrib-sass')
	grunt.loadNpmTasks('grunt-contrib-watch')	
	grunt.loadNpmTasks('grunt-autoprefixer')	
	grunt.registerTask('default', ['watch'])

}