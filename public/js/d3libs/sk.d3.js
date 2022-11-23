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

       
    // https://github.com/d3/d3-sankey v0.12.3 Copyright 2019 Mike Bostock
	!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("d3-array"),require("d3-shape")):"function"==typeof define&&define.amd?define(["exports","d3-array","d3-shape"],t):t((n=n||self).d3=n.d3||{},n.d3,n.d3)}(this,function(n,t,e){"use strict";function o(n){return n.target.depth}function r(n,t){return n.sourceLinks.length?n.depth:t-1}function i(n){return function(){return n}}function s(n,t){return u(n.source,t.source)||n.index-t.index}function f(n,t){return u(n.target,t.target)||n.index-t.index}function u(n,t){return n.y0-t.y0}function c(n){return n.value}function l(n){return n.index}function a(n){return n.nodes}function d(n){return n.links}function h(n,t){const e=n.get(t);if(!e)throw new Error("missing: "+t);return e}function g({nodes:n}){for(const t of n){let n=t.y0,e=n;for(const e of t.sourceLinks)e.y0=n+e.width/2,n+=e.width;for(const n of t.targetLinks)n.y1=e+n.width/2,e+=n.width}}function y(n){return[n.source.x1,n.y0]}function k(n){return[n.target.x0,n.y1]}n.sankey=function(){let n,e,o,y=0,k=0,L=1,p=1,w=24,x=8,m=l,v=r,M=a,b=d,S=6;function z(){const r={nodes:M.apply(null,arguments),links:b.apply(null,arguments)};return function({nodes:n,links:t}){for(const[t,e]of n.entries())e.index=t,e.sourceLinks=[],e.targetLinks=[];const e=new Map(n.map((t,e)=>[m(t,e,n),t]));for(const[n,o]of t.entries()){o.index=n;let{source:t,target:r}=o;"object"!=typeof t&&(t=o.source=h(e,t)),"object"!=typeof r&&(r=o.target=h(e,r)),t.sourceLinks.push(o),r.targetLinks.push(o)}if(null!=o)for(const{sourceLinks:t,targetLinks:e}of n)t.sort(o),e.sort(o)}(r),function({nodes:n}){for(const e of n)e.value=void 0===e.fixedValue?Math.max(t.sum(e.sourceLinks,c),t.sum(e.targetLinks,c)):e.fixedValue}(r),function({nodes:n}){const t=n.length;let e=new Set(n),o=new Set,r=0;for(;e.size;){for(const n of e){n.depth=r;for(const{target:t}of n.sourceLinks)o.add(t)}if(++r>t)throw new Error("circular link");e=o,o=new Set}}(r),function({nodes:n}){const t=n.length;let e=new Set(n),o=new Set,r=0;for(;e.size;){for(const n of e){n.height=r;for(const{source:t}of n.targetLinks)o.add(t)}if(++r>t)throw new Error("circular link");e=o,o=new Set}}(r),function(o){const r=function({nodes:n}){const o=t.max(n,n=>n.depth)+1,r=(L-y-w)/(o-1),i=new Array(o);for(const t of n){const n=Math.max(0,Math.min(o-1,Math.floor(v.call(null,t,o))));t.layer=n,t.x0=y+n*r,t.x1=t.x0+w,i[n]?i[n].push(t):i[n]=[t]}if(e)for(const n of i)n.sort(e);return i}(o);n=Math.min(x,(p-k)/(t.max(r,n=>n.length)-1)),function(e){const o=t.min(e,e=>(p-k-(e.length-1)*n)/t.sum(e,c));for(const t of e){let e=k;for(const r of t){r.y0=e,r.y1=e+r.value*o,e=r.y1+n;for(const n of r.sourceLinks)n.width=n.value*o}e=(p-e+n)/(t.length+1);for(let n=0;n<t.length;++n){const o=t[n];o.y0+=e*(n+1),o.y1+=e*(n+1)}V(t)}}(r);for(let n=0;n<S;++n){const t=Math.pow(.99,n),e=Math.max(1-t,(n+1)/S);E(r,t,e),j(r,t,e)}}(r),g(r),r}function j(n,t,o){for(let r=1,i=n.length;r<i;++r){const i=n[r];for(const n of i){let e=0,o=0;for(const{source:t,value:r}of n.targetLinks){let i=r*(n.layer-t.layer);e+=_(t,n)*i,o+=i}if(!(o>0))continue;let r=(e/o-n.y0)*t;n.y0+=r,n.y1+=r,P(n)}void 0===e&&i.sort(u),q(i,o)}}function E(n,t,o){for(let r=n.length-2;r>=0;--r){const i=n[r];for(const n of i){let e=0,o=0;for(const{target:t,value:r}of n.sourceLinks){let i=r*(t.layer-n.layer);e+=C(n,t)*i,o+=i}if(!(o>0))continue;let r=(e/o-n.y0)*t;n.y0+=r,n.y1+=r,P(n)}void 0===e&&i.sort(u),q(i,o)}}function q(t,e){const o=t.length>>1,r=t[o];H(t,r.y0-n,o-1,e),A(t,r.y1+n,o+1,e),H(t,p,t.length-1,e),A(t,k,0,e)}function A(t,e,o,r){for(;o<t.length;++o){const i=t[o],s=(e-i.y0)*r;s>1e-6&&(i.y0+=s,i.y1+=s),e=i.y1+n}}function H(t,e,o,r){for(;o>=0;--o){const i=t[o],s=(i.y1-e)*r;s>1e-6&&(i.y0-=s,i.y1-=s),e=i.y0-n}}function P({sourceLinks:n,targetLinks:t}){if(void 0===o){for(const{source:{sourceLinks:n}}of t)n.sort(f);for(const{target:{targetLinks:t}}of n)t.sort(s)}}function V(n){if(void 0===o)for(const{sourceLinks:t,targetLinks:e}of n)t.sort(f),e.sort(s)}function _(t,e){let o=t.y0-(t.sourceLinks.length-1)*n/2;for(const{target:r,width:i}of t.sourceLinks){if(r===e)break;o+=i+n}for(const{source:n,width:r}of e.targetLinks){if(n===t)break;o-=r}return o}function C(t,e){let o=e.y0-(e.targetLinks.length-1)*n/2;for(const{source:r,width:i}of e.targetLinks){if(r===t)break;o+=i+n}for(const{target:n,width:r}of t.sourceLinks){if(n===e)break;o-=r}return o}return z.update=function(n){return g(n),n},z.nodeId=function(n){return arguments.length?(m="function"==typeof n?n:i(n),z):m},z.nodeAlign=function(n){return arguments.length?(v="function"==typeof n?n:i(n),z):v},z.nodeSort=function(n){return arguments.length?(e=n,z):e},z.nodeWidth=function(n){return arguments.length?(w=+n,z):w},z.nodePadding=function(t){return arguments.length?(x=n=+t,z):x},z.nodes=function(n){return arguments.length?(M="function"==typeof n?n:i(n),z):M},z.links=function(n){return arguments.length?(b="function"==typeof n?n:i(n),z):b},z.linkSort=function(n){return arguments.length?(o=n,z):o},z.size=function(n){return arguments.length?(y=k=0,L=+n[0],p=+n[1],z):[L-y,p-k]},z.extent=function(n){return arguments.length?(y=+n[0][0],L=+n[1][0],k=+n[0][1],p=+n[1][1],z):[[y,k],[L,p]]},z.iterations=function(n){return arguments.length?(S=+n,z):S},z},n.sankeyCenter=function(n){return n.targetLinks.length?n.depth:n.sourceLinks.length?t.min(n.sourceLinks,o)-1:0},n.sankeyJustify=r,n.sankeyLeft=function(n){return n.depth},n.sankeyLinkHorizontal=function(){return e.linkHorizontal().source(y).target(k)},n.sankeyRight=function(n,t){return t-1-n.height},Object.defineProperty(n,"__esModule",{value:!0})});

    
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
            .nodeWidth(16)
            .nodePadding(25)
            .extent([ [0, 0], [dimensions.width, dimensions.height]
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
                return Math.max(10, l.width) + "px";
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
            var y = d.y0 - 8;
            d3.select(this).attr("transform", "translate(" + d.x0 + "," + y + ")");
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
				var y =  d.y0;
                return "translate(" + d.x0 + "," + y + ")";
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
                return Math.max(16, (d.y1 - d.y0) );
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
                    return Math.max(10, l.width) + "px";
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
    sk.version = "0.3.0";
    })();
    //# sourceMappingURL=sk.d3.js.map