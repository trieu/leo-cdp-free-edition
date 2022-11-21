/* skd3 version 0.2.0 (https://github.com/fabriciorhs/skd3) 2017-09-20 */
(function(){
    // set up main sk object
    var sk = {};
    sk.alertVersion = function () { alert(this.version);}
    
    // Node/CommonJS - require D3
    if (typeof(module) !== 'undefined' && typeof(exports) !== 'undefined' && typeof(d3) == 'undefined') {
        d3 = require('d3');
    }
    
    // Node/CommonJS exports
    if (typeof(module) !== 'undefined' && typeof(exports) !== 'undefined') {
      module.exports = sk;
    }
    
    if (typeof(window) !== 'undefined') {
      window.sk = sk;
    }
    // https://github.com/d3/d3-sankey Version 0.7.1. Copyright 2017 Mike Bostock.
    !function(n,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("d3-array"),require("d3-collection"),require("d3-shape")):"function"==typeof define&&define.amd?define(["exports","d3-array","d3-collection","d3-shape"],t):t(n.d3=n.d3||{},n.d3,n.d3,n.d3)}(this,function(n,t,e,r){"use strict";function o(n){return n.target.depth}function u(n){return n.depth}function i(n,t){return t-1-n.height}function c(n,t){return n.sourceLinks.length?n.depth:t-1}function f(n){return n.targetLinks.length?n.depth:n.sourceLinks.length?t.min(n.sourceLinks,o)-1:0}function s(n){return function(){return n}}function a(n,t){return d(n.source,t.source)||n.index-t.index}function h(n,t){return d(n.target,t.target)||n.index-t.index}function d(n,t){return n.y0-t.y0}function l(n){return n.value}function y(n){return(n.y0+n.y1)/2}function g(n){return y(n.source)*n.value}function k(n){return y(n.target)*n.value}function p(n){return n.index}function v(n){return n.nodes}function L(n){return n.links}function E(n,t){var e=n.get(t);if(!e)throw new Error("missing: "+t);return e}function x(n){return[n.source.x1,n.y0]}function m(n){return[n.target.x0,n.y1]}var w=function(){function n(){var n={nodes:O.apply(null,arguments),links:H.apply(null,arguments)};return r(n),o(n),u(n),i(n),f(n),n}function r(n){n.nodes.forEach(function(n,t){n.index=t,n.sourceLinks=[],n.targetLinks=[]});var t=e.map(n.nodes,q);n.links.forEach(function(n,e){n.index=e;var r=n.source,o=n.target;"object"!=typeof r&&(r=n.source=E(t,r)),"object"!=typeof o&&(o=n.target=E(t,o)),r.sourceLinks.push(n),o.targetLinks.push(n)})}function o(n){n.nodes.forEach(function(n){n.value=Math.max(t.sum(n.sourceLinks,l),t.sum(n.targetLinks,l))})}function u(n){var t,e,r;for(t=n.nodes,e=[],r=0;t.length;++r,t=e,e=[])t.forEach(function(n){n.depth=r,n.sourceLinks.forEach(function(n){e.indexOf(n.target)<0&&e.push(n.target)})});for(t=n.nodes,e=[],r=0;t.length;++r,t=e,e=[])t.forEach(function(n){n.height=r,n.targetLinks.forEach(function(n){e.indexOf(n.source)<0&&e.push(n.source)})});var o=(w-x-b)/(r-1);n.nodes.forEach(function(n){n.x1=(n.x0=x+Math.max(0,Math.min(r-1,Math.floor(z.call(null,n,r))))*o)+b})}function i(n){function r(){o.forEach(function(n){var t,e,r,o=m,u=n.length;for(n.sort(d),r=0;r<u;++r)(e=o-(t=n[r]).y0)>0&&(t.y0+=e,t.y1+=e),o=t.y1+j;if((e=o-j-M)>0)for(o=t.y0-=e,t.y1-=e,r=u-2;r>=0;--r)(e=(t=n[r]).y1+j-o)>0&&(t.y0-=e,t.y1-=e),o=t.y0})}var o=e.nest().key(function(n){return n.x0}).sortKeys(t.ascending).entries(n.nodes).map(function(n){return n.values});!function(){var e=t.min(o,function(n){return(M-m-(n.length-1)*j)/t.sum(n,l)});o.forEach(function(n){n.forEach(function(n,t){n.y1=(n.y0=t)+n.value*e})}),n.links.forEach(function(n){n.width=n.value*e})}(),r();for(var u=1,i=P;i>0;--i)!function(n){o.slice().reverse().forEach(function(e){e.forEach(function(e){if(e.sourceLinks.length){var r=(t.sum(e.sourceLinks,k)/t.sum(e.sourceLinks,l)-y(e))*n;e.y0+=r,e.y1+=r}})})}(u*=.99),r(),function(n){o.forEach(function(e){e.forEach(function(e){if(e.targetLinks.length){var r=(t.sum(e.targetLinks,g)/t.sum(e.targetLinks,l)-y(e))*n;e.y0+=r,e.y1+=r}})})}(u),r()}function f(n){n.nodes.forEach(function(n){n.sourceLinks.sort(h),n.targetLinks.sort(a)}),n.nodes.forEach(function(n){var t=n.y0,e=t;n.sourceLinks.forEach(function(n){n.y0=t+n.width/2,t+=n.width}),n.targetLinks.forEach(function(n){n.y1=e+n.width/2,e+=n.width})})}var x=0,m=0,w=1,M=1,b=24,j=8,q=p,z=c,O=v,H=L,P=32;return n.update=function(n){return f(n),n},n.nodeId=function(t){return arguments.length?(q="function"==typeof t?t:s(t),n):q},n.nodeAlign=function(t){return arguments.length?(z="function"==typeof t?t:s(t),n):z},n.nodeWidth=function(t){return arguments.length?(b=+t,n):b},n.nodePadding=function(t){return arguments.length?(j=+t,n):j},n.nodes=function(t){return arguments.length?(O="function"==typeof t?t:s(t),n):O},n.links=function(t){return arguments.length?(H="function"==typeof t?t:s(t),n):H},n.size=function(t){return arguments.length?(x=m=0,w=+t[0],M=+t[1],n):[w-x,M-m]},n.extent=function(t){return arguments.length?(x=+t[0][0],w=+t[1][0],m=+t[0][1],M=+t[1][1],n):[[x,m],[w,M]]},n.iterations=function(t){return arguments.length?(P=+t,n):P},n},M=function(){return r.linkHorizontal().source(x).target(m)};n.sankey=w,n.sankeyCenter=f,n.sankeyLeft=u,n.sankeyRight=i,n.sankeyJustify=c,n.sankeyLinkHorizontal=M,Object.defineProperty(n,"__esModule",{value:!0})});// d3.tip
    // Copyright (c) 2013 Justin Palmer
    //
    // Tooltips for d3.js SVG visualizations
    
    (function (root, factory) {
      if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module with d3 as a dependency.
        define(['d3'], factory)
      } else if (typeof module === 'object' && module.exports) {
        // CommonJS
        var d3 = require('d3')
        module.exports = factory(d3)
      } else {
        // Browser global.
        root.d3.tip = factory(root.d3)
      }
    }(this, function (d3) {
    
      // Public - contructs a new tooltip
      //
      // Returns a tip
      return function() {
        var direction = d3_tip_direction,
            offset    = d3_tip_offset,
            html      = d3_tip_html,
            node      = initNode(),
            svg       = null,
            point     = null,
            target    = null
    
        function tip(vis) {
          svg = getSVGNode(vis)
          point = svg.createSVGPoint()
          document.body.appendChild(node)
        }
    
        // Public - show the tooltip on the screen
        //
        // Returns a tip
        tip.show = function() {
          var args = Array.prototype.slice.call(arguments)
          if(args[args.length - 1] instanceof SVGElement) target = args.pop()
    
          var content = html.apply(this, args),
              poffset = offset.apply(this, args),
              dir     = direction.apply(this, args),
              nodel   = getNodeEl(),
              i       = directions.length,
              coords,
              scrollTop  = document.documentElement.scrollTop || document.body.scrollTop,
              scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
    
          nodel.html(content)
            .style('opacity', 1).style('pointer-events', 'all')
    
          while(i--) nodel.classed(directions[i], false)
          coords = direction_callbacks.get(dir).apply(this)
          nodel.classed(dir, true)
              .style('top', (coords.top +  poffset[0]) + scrollTop + 'px')
              .style('left', (coords.left + poffset[1]) + scrollLeft + 'px')
    
          return tip;
        };
    
        // Public - hide the tooltip
        //
        // Returns a tip
        tip.hide = function() {
          var nodel = getNodeEl()
          nodel.style('opacity', 0).style('pointer-events', 'none')
          return tip
        }
    
        // Public: Proxy attr calls to the d3 tip container.  Sets or gets attribute value.
        //
        // n - name of the attribute
        // v - value of the attribute
        //
        // Returns tip or attribute value
        tip.attr = function(n, v) {
          if (arguments.length < 2 && typeof n === 'string') {
            return getNodeEl().attr(n)
          } else {
            var args =  Array.prototype.slice.call(arguments)
            d3.selection.prototype.attr.apply(getNodeEl(), args)
          }
    
          return tip
        }
    
        // Public: Proxy style calls to the d3 tip container.  Sets or gets a style value.
        //
        // n - name of the property
        // v - value of the property
        //
        // Returns tip or style property value
        tip.style = function(n, v) {
          if (arguments.length < 2 && typeof n === 'string') {
            return getNodeEl().style(n)
          } else {
            var args = Array.prototype.slice.call(arguments)
            d3.selection.prototype.style.apply(getNodeEl(), args)
          }
    
          return tip
        }
    
        // Public: Set or get the direction of the tooltip
        //
        // v - One of n(north), s(south), e(east), or w(west), nw(northwest),
        //     sw(southwest), ne(northeast) or se(southeast)
        //
        // Returns tip or direction
        tip.direction = function(v) {
          if (!arguments.length) return direction
          direction = v == null ? v : functor(v)
    
          return tip
        }
    
        // Public: Sets or gets the offset of the tip
        //
        // v - Array of [x, y] offset
        //
        // Returns offset or
        tip.offset = function(v) {
          if (!arguments.length) return offset
          offset = v == null ? v : functor(v)
    
          return tip
        }
    
        // Public: sets or gets the html value of the tooltip
        //
        // v - String value of the tip
        //
        // Returns html value or tip
        tip.html = function(v) {
          if (!arguments.length) return html
          html = v == null ? v : functor(v)
    
          return tip
        }
    
        // Public: destroys the tooltip and removes it from the DOM
        //
        // Returns a tip
        tip.destroy = function() {
          if(node) {
            getNodeEl().remove();
            node = null;
          }
          return tip;
        }
    
        function d3_tip_direction() { return 'n' }
        function d3_tip_offset() { return [0, 0] }
        function d3_tip_html() { return ' ' }
    
        var direction_callbacks = d3.map({
          n:  direction_n,
          s:  direction_s,
          e:  direction_e,
          w:  direction_w,
          nw: direction_nw,
          ne: direction_ne,
          sw: direction_sw,
          se: direction_se
        }),
    
        directions = direction_callbacks.keys()
    
        function direction_n() {
          var bbox = getScreenBBox()
          return {
            top:  bbox.n.y - node.offsetHeight,
            left: bbox.n.x - node.offsetWidth / 2
          }
        }
    
        function direction_s() {
          var bbox = getScreenBBox()
          return {
            top:  bbox.s.y,
            left: bbox.s.x - node.offsetWidth / 2
          }
        }
    
        function direction_e() {
          var bbox = getScreenBBox()
          return {
            top:  bbox.e.y - node.offsetHeight / 2,
            left: bbox.e.x
          }
        }
    
        function direction_w() {
          var bbox = getScreenBBox()
          return {
            top:  bbox.w.y - node.offsetHeight / 2,
            left: bbox.w.x - node.offsetWidth
          }
        }
    
        function direction_nw() {
          var bbox = getScreenBBox()
          return {
            top:  bbox.nw.y - node.offsetHeight,
            left: bbox.nw.x - node.offsetWidth
          }
        }
    
        function direction_ne() {
          var bbox = getScreenBBox()
          return {
            top:  bbox.ne.y - node.offsetHeight,
            left: bbox.ne.x
          }
        }
    
        function direction_sw() {
          var bbox = getScreenBBox()
          return {
            top:  bbox.sw.y,
            left: bbox.sw.x - node.offsetWidth
          }
        }
    
        function direction_se() {
          var bbox = getScreenBBox()
          return {
            top:  bbox.se.y,
            left: bbox.e.x
          }
        }
    
        function initNode() {
          var node = d3.select(document.createElement('div'));
          node.style('position', 'absolute').style('top', 0).style('opacity', 0)
              .style('pointer-events', 'none').style('box-sizing', 'border-box')
    
          return node.node()
        }
    
        function getSVGNode(el) {
          el = el.node()
          if(el.tagName.toLowerCase() === 'svg')
            return el
    
          return el.ownerSVGElement
        }
    
        function getNodeEl() {
          if(node === null) {
            node = initNode();
            // re-add node to DOM
            document.body.appendChild(node);
          };
          return d3.select(node);
        }
    
        // Private - gets the screen coordinates of a shape
        //
        // Given a shape on the screen, will return an SVGPoint for the directions
        // n(north), s(south), e(east), w(west), ne(northeast), se(southeast), nw(northwest),
        // sw(southwest).
        //
        //    +-+-+
        //    |   |
        //    +   +
        //    |   |
        //    +-+-+
        //
        // Returns an Object {n, s, e, w, nw, sw, ne, se}
        function getScreenBBox() {
          var targetel   = target || d3.event.target;
    
          while ('undefined' === typeof targetel.getScreenCTM && 'undefined' === targetel.parentNode) {
              targetel = targetel.parentNode;
          }
    
          var bbox       = {},
              matrix     = targetel.getScreenCTM(),
              tbbox      = targetel.getBBox(),
              width      = tbbox.width,
              height     = tbbox.height,
              x          = tbbox.x,
              y          = tbbox.y
    
          point.x = x
          point.y = y
          bbox.nw = point.matrixTransform(matrix)
          point.x += width
          bbox.ne = point.matrixTransform(matrix)
          point.y += height
          bbox.se = point.matrixTransform(matrix)
          point.x -= width
          bbox.sw = point.matrixTransform(matrix)
          point.y -= height / 2
          bbox.w  = point.matrixTransform(matrix)
          point.x += width
          bbox.e = point.matrixTransform(matrix)
          point.x -= width / 2
          point.y -= height / 2
          bbox.n = point.matrixTransform(matrix)
          point.y += height
          bbox.s = point.matrixTransform(matrix)
    
          return bbox
        }
        
        // Private - replace D3JS 3.X d3.functor() function
        function functor(v) {
            return typeof v === "function" ? v : function() {
            	return v
            }
        }
    
        return tip
      };
    
    }));
    sk.createSankey = function(containerId, configSankey, dataSankey) {
    
        // to prevent NaN value, related https://github.com/d3/d3-sankey/issues/39
        var _safeValueToLink = function(v) { return Math.max(v, Number.MIN_VALUE); }
    
        var _dataSankey = {
            nodes: [],
            links: []
        };
    
        //load data
        dataSankey.nodes.map(function(d) {
            _dataSankey.nodes.push({
                name: d.name,
                color: d.color,
                id: d.id
            });
        });
        dataSankey.links.map(function(l) {
            _dataSankey.links.push({
                source: l.source,
                target: l.target,
                id: l.id,
                value: _safeValueToLink(l.value)
            });
        });
    
        //var _dataSankey = Object.assign({}, dataSankey);
    
        var _updateLinksId = function(linkData) {
            for (var i = 0; i < linkData.length; i++)
                if (linkData[i].id == undefined)
                    linkData[i].id = linkData[i].source + " -> " + linkData[i].target;
        };
        //update links id
        _updateLinksId(_dataSankey.links);
    
        //removing old svg and tips
        d3.select('.d3-tip-nodes').remove();
        d3.select('.d3-tip').remove();
        d3.select(containerId + ' svg').remove()
    
        var container = d3.select(containerId);
    
        function _getDimensions(container, margin) {
            var bbox = container.node().getBoundingClientRect();
            return {
                width: bbox.width - margin.left - margin.right,
                height: bbox.height - margin.top - margin.bottom
            };
        }
        var dimensions = _getDimensions(container, configSankey.margin);
    
        var svg_base = container.append("svg")
            .attr('width', dimensions.width + configSankey.margin.left + configSankey.margin.right)
            .attr('height', dimensions.height + configSankey.margin.top + configSankey.margin.bottom)
            .attr("class", "sk-svg");
        var svg = svg_base.append("g")
            .attr('transform', "translate(" + configSankey.margin.left + "," + configSankey.margin.top + ")");
    
        var sankey = d3.sankey()
            .nodeWidth(15)
            .nodePadding(10)
            .extent([
                [0, 0],
                [dimensions.width, dimensions.height]
            ]);
    
        var path = d3.sankeyLinkHorizontal();
    
        //Fonts
        var _getFontSize = function(d) {
            return configSankey.nodes.fontSize;
        }; //For default
        var _dynamicFontSize;
        var _updateRangeFontData = function(d) {}; //For default
        if (configSankey.nodes.dynamicSizeFontNode.enabled) {
            _dynamicFontSize = d3.scaleLinear().range(
                [configSankey.nodes.dynamicSizeFontNode.minSize,
                    configSankey.nodes.dynamicSizeFontNode.maxSize
                ]);
            _updateRangeFontData = function(nodeData) {
                _dynamicFontSize.domain(d3.extent(nodeData, function(d) {
                    return d.value > 0 ? d.value : 1
                }));
            };
            _getFontSize = function(d) {
                return Math.floor(_dynamicFontSize(d.value > 0 ? d.value : 1));
            };
        }
        
        //options defaults for drag nodes
        var _nodes_draggableX = false;
        var _nodes_draggableY = true;
        
        if (configSankey.nodes.draggableX != undefined) _nodes_draggableX = configSankey.nodes.draggableX;
        if (configSankey.nodes.draggableY != undefined) _nodes_draggableY = configSankey.nodes.draggableY;
    
        //Colors
        //set color in nodes, case not exists
        for (var i = 0; i < _dataSankey.nodes.length; i++)
            if (_dataSankey.nodes[i].color == undefined)
                _dataSankey.nodes[i].color = configSankey.nodes.colors(_dataSankey.nodes[i].name.replace(/ .*/, ""));
    
        //Tooltip function:
        //D3 sankey diagram with view options (Austin Czarnecki�s Block cc6371af0b726e61b9ab)
        //https://bl.ocks.org/austinczarnecki/cc6371af0b726e61b9ab
        var linkTooltipOffset = 65,
            nodeTooltipOffset = 130;
        var tipLinks = d3.tip().attr("class", "d3-tip").offset([-10, 0]);
        var tipNodes = d3.tip().attr("class", "d3-tip d3-tip-nodes").offset([-10, 0]);
    
        function _formatValueTooltip(targetName, val, candidateName) {
        	console.log(targetName, candidateName, val)
            if (configSankey.links.formatValue)
                return configSankey.links.formatValue(targetName, val , candidateName );
            else
                return val + ' ' + configSankey.links.unit;
        }
    
        tipLinks.html(function(d) {
            var targetName, candidateName;
            if (_dataSankey.links.indexOf(d.source.name) > -1) {
            	candidateName = d.source.name;
                targetName = d.target.name;
            } else {
            	candidateName = d.target.name;
                targetName = d.source.name;
            }
            var html = '<div class="table-wrapper">' +
                '<center><h1>' + targetName + '</h1></center>' +
                '<table>' +
                '<tr>' +
                '<td class="col-left">' + candidateName + '</td>' +
                '<td align="right">' + _formatValueTooltip(targetName, d.value, candidateName ) + '</td>' +
                '</tr>' +
                '</table>' +
                '</div>';
            return html;
        });
        var topContentSVG = d3.select('.sk-svg').node().getBoundingClientRect().top;
        tipLinks.move = function(event) {
            tipLinks
                .style("top", function() {
                    if (d3.event.pageY - topContentSVG - linkTooltipOffset >= 0)
                        return (d3.event.pageY - linkTooltipOffset) + "px";
                    else
                        return d3.event.pageY + 20 + "px";
                })
                .style("left", function() {
                    var left = (Math.max(d3.event.pageX - linkTooltipOffset, 10));
                    left = Math.min(left, window.innerWidth - d3.select('.d3-tip').node().getBoundingClientRect().width - 20)
                    return left + "px";
                })
        };
    
        tipNodes.html(function(d) {
            var nodeName = d.name;
            var linksFrom = d.targetLinks; //invert for reference
            var linksTo = d.sourceLinks;
            var html;
    
            html = '<div class="table-wrapper">' +
                '<center><h1>' + nodeName + '</h1></center>' +
                '<table>';
            if (linksFrom.length > 0 & linksTo.length > 0) {
                html += '<tr><td><h2>' + configSankey.tooltip.labelSource + '</h2></td><td></td></tr>'
            }
            for (i = 0; i < linksFrom.length; ++i) {
				// console.log("linksFrom[i] ", linksFrom[i])
                html += '<tr>' +
                    '<td class="col-left">' + linksFrom[i].source.name + '</td>' +
                  //  '<td align="right">' + _formatValueTooltip(nodeName, linksFrom[i].target.value) + '</td>' +
                    '</tr>';
            }
            if (linksFrom.length > 0 & linksTo.length > 0) {
                html += '<tr><td></td><td></td><tr><td></td><td></td> </tr><tr><td><h2>' + configSankey.tooltip.labelTarget + '</h2></td><td></td></tr>'
            }
            for (i = 0; i < linksTo.length; ++i) {
				// console.log("linksTo[i] ", linksTo[i])
                html += '<tr>' +
                    '<td class="col-left">' + linksTo[i].target.name + '</td>' +
                 //   '<td align="right">' + _formatValueTooltip(nodeName, linksTo[i].source.value) + '</td>' +
                    '</tr>';
            }
            html += '</table></div>';
            return html;
        });
        tipNodes.move = function(event) {
            tipNodes.boxInfo = d3.select('.d3-tip-nodes').node().getBoundingClientRect();
            tipNodes
                .style("top",
                    function() {
                        if ((d3.event.pageY - topContentSVG - tipNodes.boxInfo.height - 20) >= 0)
                            return (d3.event.pageY - tipNodes.boxInfo.height - 20) + "px";
                        else
                            return d3.event.pageY + 20 + "px";
                    }
                )
                .style("left", function() {
                    var left = (Math.max(d3.event.pageX - nodeTooltipOffset, 10));
                    left = Math.min(left, window.innerWidth - d3.select('.d3-tip').node().getBoundingClientRect().width - 20)
                    return left + "px";
                })
        };
    
        svg.call(tipLinks);
        svg.call(tipNodes);
        var _stopTooltips = function() {
            if (tipLinks) tipLinks.hide();
            if (tipNodes) tipNodes.hide();
        };
    
        //Load data
        sankey(_dataSankey);
    
        //update range font data
        _updateRangeFontData(_dataSankey.nodes);
    
    
        var link = svg.append("g").selectAll(".sk-link")
            .data(_dataSankey.links, function(l) {
                return l.id;
            })
            .enter().append("path")
            .attr("class", "sk-link")
            .attr("d", path)
            .style("stroke", function(l) {
                return l.source.color;
            })
            .style("stroke-width", function(l) {
                return Math.max(1, l.width) + "px";
            })
            .sort(function(a, b) {
                return b.width - a.width;
            });
        if (configSankey.tooltip.infoDiv)
            link.on('mousemove', tipLinks.move).on('mouseover', tipLinks.show).on('mouseout', tipLinks.hide);
        else
            link.append("title").text(function(d) {
                return d.source.name + " -> " + d.target.name + "\n" + _formatValueTooltip('',d.value);
            });
    
        // the function for moving the nodes
        function _dragmove(d) {
            _stopTooltips();
            if (_nodes_draggableX && (d3.event.x < dimensions.width)) {
                d.x0 = Math.max(0, Math.min(dimensions.width - sankey.nodeWidth(), d.x0 + d3.event.dx));
                d.x1 = d.x0 + sankey.nodeWidth();
            }
            if (_nodes_draggableY && (d3.event.y < dimensions.height)) {
                var heightNode = d.y1 - d.y0;
                d.y0 = Math.max(0, Math.min(dimensions.height - (d.y1 - d.y0), d.y0 + d3.event.dy));
                d.y1 = d.y0 + heightNode;
            }
            d3.select(this).attr("transform", "translate(" + d.x0 + "," + d.y0 + ")");
            sankey.update(_dataSankey);
            link.attr("d", path);
        }
    
        var node = svg.append("g").selectAll(".sk-node")
            .data(_dataSankey.nodes, function(d) {
                return d.name;
            })
            .enter().append("g")
            .attr("class", "sk-node")
            .attr("transform", function(d) {
                return "translate(" + d.x0 + "," + d.y0 + ")";
            })
        if (configSankey.tooltip.infoDiv)
            node.on('mousemove', tipNodes.move).on('mouseover', tipNodes.show).on('mouseout', tipNodes.hide);
        else
            node.append("title").text(function(d) {
                return d.name + "\n" + _formatValueTooltip('',d.value);
            });
        //Drag nodes	
        if (_nodes_draggableX || _nodes_draggableY)
            node.call(d3.drag().subject(function(d) {
                return d;
            }).on("start", function(d) {
                d3.event.sourceEvent.stopPropagation();
                this.parentNode.appendChild(this);
            }).on("drag", _dragmove));
    
        node.append("rect")
            .attr("height", function(d) {
                return (d.y1 - d.y0);
            })
            .attr("width", sankey.nodeWidth())
            .style("fill", function(d) {
                return d.color;
            })
            .style("stroke", function(d) {
                return d3.rgb(d.color).darker(1.8);
            });
    
        node.append("text")
            .attr("x", -6)
            .attr("y", function(d) {
                return (d.y1 - d.y0) / 2;
            })
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .attr("transform", null)
            .style("fill", function(d) {
                return d3.rgb(d.color).darker(2.4);
            })
            .text(function(d) {
                return d.name;
            })
            .style("font-size", function(d) {
                return _getFontSize(d) + "px";
            })
            .filter(function(d) {
                return d.x0 < dimensions.width / 2;
            })
            .attr("x", 6 + sankey.nodeWidth())
            .attr("text-anchor", "start");
    
        //https://bl.ocks.org/syntagmatic/77c7f7e8802e8824eed473dd065c450b
        var _updateLinksValues = function(dataUpdated) {
            _stopTooltips();
            sankey(dataUpdated);
            sankey.update(dataUpdated);
    
            //update range font data
            _updateRangeFontData(dataUpdated.nodes);
    
            svg.selectAll(".sk-link")
                .data(dataUpdated.links, function(d) {
                    return d.id;
                })
                .sort(function(a, b) {
                    return b.width - a.width;
                })
                .transition()
                .duration(1300)
                .attr("d", path)
                .style("stroke-width", function(l) {
                    return Math.max(1, l.width) + "px";
                });
    
            svg.selectAll(".sk-node")
                .data(dataUpdated.nodes, function(d) {
                    return d.name;
                })
                .transition()
                .duration(1300)
                .attr("transform", function(d) {
                    return "translate(" + d.x0 + "," + d.y0 + ")";
                });
    
            svg.selectAll(".sk-node rect")
                .transition()
                .duration(1300)
                .attr("height", function(d) {
                    return (d.y1 - d.y0);
                });
    
            svg.selectAll(".sk-node text")
                .transition()
                .duration(1300)
                .attr("y", function(d) {
                    return (d.y1 - d.y0) / 2;
                })
                .style("font-size", function(d) {
                    return _getFontSize(d) + "px";
                });
        };
    
        //Update value of links, for call the function '_updateLinksValues' transition values (old to new)
        //This function only update values from links
        this.updateData = function(dataUpdated) {
            for (var i = 0; i < dataUpdated.links.length; i++) {
                var idLinkUpdate = dataUpdated.links[i].id || dataUpdated.links[i].source + " -> " + dataUpdated.links[i].target;
                var linkToUpdate = _dataSankey.links.filter(function(l) {
                    return l.id == idLinkUpdate
                })[0];
                if (linkToUpdate) linkToUpdate.value = _safeValueToLink(dataUpdated.links[i].value);
            }
            _updateLinksValues(_dataSankey);
        };
    
        return this;
    };
    sk.version = "0.2.0";
    })();
    //# sourceMappingURL=sk.d3.js.map