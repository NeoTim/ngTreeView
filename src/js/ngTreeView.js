module.exports = angular
  .module('ngTreeView', [])
  .directive('treeView', ngTreeView);

ngTreeView.$inject = ['$compile', '$timeout'];

function ngTreeView($compile, $timeout) {
  var times = 0;
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
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
      var template = `
          <ul>
            <li ng-repeat="node in ${treeModel}">
              <div id="{{node._id}}" class="tree-view-node level-${times}" ng-class="{selected: node.selected}" ng-click="selectNode(node, ${treeModel})">
                  <i class="icon-angle-right" ng-if="node.${nodeChildren}.length && node.collapsed"></i>
                  <i class="icon-angle-down" ng-if="node.${nodeChildren}.length && !node.collapsed"></i>
                  <i class="icon-folder" ng-if="node.${nodeChildren}.length"></i>
                  <i class="icon-doc-text" ng-if="!node.${nodeChildren}.length"></i>
                  <span title="{{node.${nodeLabel}}}">{{node.${nodeLabel}}}</span>
              </div>
              <div
                ng-if="node.${nodeChildren}.length"
                ng-show="!node.collapsed"
                tree-view
                tree-id="${treeId}"
                tree-model="node.${nodeChildren}"
                node-id="${nodeId}"
                node-label="${nodeLabel}"
                node-children="${nodeChildren}"
              ></div>
            </li>
          </ul>
        `;

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
