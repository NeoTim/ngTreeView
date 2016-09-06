(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = angular.module('ngTreeView', []).directive('treeView', ngTreeView);

ngTreeView.$inject = ['$compile', '$timeout'];

function ngTreeView($compile, $timeout) {
  var times = 0;
  return {
    restrict: 'A',
    link: function link(scope, element, attrs) {
      times++;

      // tree id
      var treeId = attrs.treeId;

      // tree model
      var treeModel = attrs.treeModel;

      // node id
      var nodeId = attrs.nodeId || 'id';

      // node label
      var nodeLabel = attrs.nodeLabel || 'label';

      // children
      var nodeChildren = attrs.nodeChildren || 'children';

      // tree template
      var template = '\n          <ul>\n            <li ng-repeat="node in ' + treeModel + '">\n              <div id="{{node._id}}" class="tree-view-node level-' + times + '" ng-class="{selected: node.selected}" ng-click="selectNode(node, ' + treeModel + ')">\n                  <i class="icon-angle-right" ng-if="node.' + nodeChildren + '.length && node.collapsed"></i>\n                  <i class="icon-angle-down" ng-if="node.' + nodeChildren + '.length && !node.collapsed"></i>\n                  <i class="icon-folder" ng-if="node.' + nodeChildren + '.length"></i>\n                  <i class="icon-doc-text" ng-if="!node.' + nodeChildren + '.length"></i>\n                  <span>{{node.' + nodeLabel + '}}</span>\n              </div>\n              <div\n                ng-if="node.' + nodeChildren + '.length"\n                ng-show="!node.collapsed"\n                tree-view\n                tree-id="' + treeId + '"\n                tree-model="node.' + nodeChildren + '"\n                node-id="' + nodeId + '"\n                node-label="' + nodeLabel + '"\n                node-children="' + nodeChildren + '"\n              ></div>\n            </li>\n          </ul>\n        ';

      // check tree id, tree model
      if (!treeId && !treeModel) {
        return;
      }

      scope[treeId] = scope[treeId] || {};

      // if node label clicks,
      scope.selectNode = function (node, list) {
        scope.$emit('selectNodeSuccess', node);

        if (node.children && node.children.length) {
          node.collapsed = !node.collapsed;
        }

        //remove highlight from previous node
        if (scope[treeId].currentNode && scope[treeId].currentNode.selected) {
          scope[treeId].currentNode.selected = false;
        }

        node.selected = true;

        //set currentNode
        scope[treeId].currentNode = node;
      };

      // Rendering template.
      element.html('').append($compile(template)(scope));
    }
  };
}

},{}]},{},[1]);
