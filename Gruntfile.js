module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');  

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    builddir: 'dist/theme',
    banner: '/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %>\n' +
            ' * Homepage: <%= pkg.homepage %>\n' +
            ' * Copyright 2012-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license %>\n' +
            ' * Based on Bootstrap\n' +
            '*/\n',
    clean: {
      build: {
        src: ['theme/*/build.less', '!theme/global/build.less']
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      dist: {
        src: ['theme'],
        dest: 'dist/theme'
      }
    },
    less: {
      dist: {
        options: {
          compress: false
        },
        files: {}
      }
    },
    copy: {
        index: {
          src:['theme/index.html', 'theme/*.js'],
          expand: true,
          dest: 'dist/',
          flatten: true
        },
        menu1: {
          src:['theme/menu1/*'],
          expand: true,
          dest: 'dist/menu1',
          flatten: true
        },		
        openflightgps: {
          src:['theme/openflightgps/*'],
          expand: true,
          dest: 'dist/openflightgps',
          flatten: true
        },		
        privacy: {
          src:['theme/privacy/*'],
          expand: true,
          dest: 'dist/privacy',
          flatten: true
        },		
        stat: {
		  cwd: 'theme/static',
          src:'**/*',
          expand: true,
          dest: 'dist/static',
        },		
        fun: {
          src:['theme/fun/*'],
          expand: true,
          dest: 'dist/fun',
          flatten: true
        },		
        theme: {
            src:['theme/*.css'],
            dest: 'dist/'
          },
		support: {
			src: ['bower_components/bootstrap/dist/js/bootstrap.min.js'],
			dest: 'dist/theme/bootstrap.min.js'
		}
    }
  });

  grunt.registerTask('none', function() {});

  grunt.registerTask('build', 'build a regular theme', function(compress) {
    var compress = compress == undefined ? true : compress;

    var concatSrc;
    var concatDest;
    var lessDest;
    var lessSrc;
    var files = {};
    var dist = {};
    concatSrc = '<%=builddir%>' + 'theme/global/build.less';
    concatDest = '<%=builddir%>' + '/build.less';
    lessDest = '<%=builddir%>' + '/bootstrap.css';
    lessSrc = [ 'theme/global/' + 'build.less' ];

    dist = {src: concatSrc, dest: concatDest};
    grunt.config('concat.dist', dist);
    files = {}; 
    files[lessDest] = lessSrc;
    grunt.config('less.dist.files', files);
    grunt.config('less.dist.options.compress', false);

    grunt.task.run(['concat', 'less:dist', 'clean:build',
      compress ? 'compress:'+lessDest+':'+'<%=builddir%>' + '/bootstrap.min.css':'none']);
    grunt.task.run(['copy:index','copy:menu1','copy:openflightgps', 'copy:privacy',
		'copy:stat', 'copy:fun', 'copy:theme','copy:support']);
  });

  grunt.registerTask('compress', 'compress a generic css', function(fileSrc, fileDst) {
    var files = {}; files[fileDst] = fileSrc;
    grunt.log.writeln('compressing file ' + fileSrc);

    grunt.config('less.dist.files', files);
    grunt.config('less.dist.options.compress', true);
    grunt.task.run(['less:dist']);
  });

  grunt.registerTask('default', 'build a theme', function() {
    grunt.task.run('build');
  });
};
