module.exports = function (grunt) {
    grunt.initConfig({
        nodeunit: {
            all: ['test/**/*.js']
        },
        jshint: {
            all: ['*.js', 'app/**/*.js'],
            options: {
                esversion: 6
            }
        },
        clean: {
            options: {force: true},
            all: ['./apidoc/']
        },
        apidoc: {
            all: {
                src: "app/",
                dest: "apidoc/"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-apidoc');

    grunt.registerTask('test', ['jshint', 'nodeunit']);
    grunt.registerTask('default', ['clean', 'apidoc']);
};