Eclipse kepler R2 works OK, but must go:

properties->javascript->includepath
and basically delete all of the crap there

make .js, .json files open with javascript editor

create an external build grunt task as per directions on the pebble wiki

turn off autobuild (or just create a project builder that does the same thing
as your external grunt task, which makes rebuilds ctrl-b easy)


--------------

create the theme:
create a folder from root (using eclipse->new folder), put in your gruntfile.js and package.json
for the theme I had to copy in the bower_components, they were not generated

% npm install
% grunt



TODO
-----------------------
packaging/sharing resources (.js, assets, theme) as a bundle?
