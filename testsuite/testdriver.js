//clear Storage
/*jslint browser*/
/*global window*/
(function testDriver() {
    "use strict";
    var tests = [
        {exec: false, path: 'test0.html'}, //dont exec!
        {exec: true, path: 'test1.html'},
        {exec: true, path: 'test2.html'},
        {exec: true, path: 'test3.html'},
        {exec: true, path: 'test4.html'},
        {exec: true, path: 'test5.html'}
    ];
    var testframe = document.getElementById('testframe');
    var currentTest = 1;
    var total = 'passed';

    function addTestResult(name, desc, result) {
        var dl = document.getElementById('testresults');
        var template = document.getElementById('template').innerHTML;
        template = template.replace(/@file@/g, name);
        template = template.replace(/@desc@/, desc);
        template = template.replace(/@result@/g, result);
        dl.innerHTML = dl.innerHTML + template;
        window.scrollBy(0, 20);
    }

    function run(index) {
        if (tests[index]) {
            currentTest = index;
            if (tests[index].exec) {
                window.setTimeout(function () {
                    testframe.src = tests[index].path;
                }, 0);
            } else {
                addTestResult(tests[index].path, 'omitted', 'omitted');
                run(index + 1);
                return;
            }
        } else {
            addTestResult('', navigator.userAgent, total);
            return;
        }
    }

    window.addEventListener('message', function (e) {
        var msg = JSON.parse(e.data);
        addTestResult(tests[msg.index].path, msg.desc, msg.result);
        if (msg.result === 'failed') {
            total = 'failed';
        }
        run(msg.index + 1);
    }, false);

    run(currentTest);
}());