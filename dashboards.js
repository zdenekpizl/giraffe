var graphite_url = "http://zpi-sandbox.na.getgooddata.com";  // enter your graphite url, e.g. http://your.graphite.com

var dashboards = 
[

  /* This is a block for Dashboard */
  { "name": "Giraffe PoC",
    "refresh": 10000,
    "scheme": "classic9",   // this is a dashboard-specific color palette
    "description": "",
    "metrics": 
  /* This is a block for only one Graph */
    [
      {
        "alias": "Open files used",
        "target": ["alias(avg(servers.stg-pdwh0[123].system.open_files.used),'Average of stg-pdwh0[123]')",
    		    "aliasByNode(servers.stg-pdwh0[123].system.open_files.used,1)"],
        "events": "*",  // instead of annotator, if you use the graphite events feature
                        // you can retrieve events matching specific tag(s) -- space separated
                        // or use * for all tags. Note you cannot use both annotator and events.
        "description": "Open files used",
    	"renderer": "line",
        "interpolation": "linear",
        "colspan": 3,
      },
    ]
  },

  /* This is a block for one whole Dashboard */
  {
    "name": "DEV-CMP06 characteristics",
    "refresh": 30000,
    "scheme": "classic9",   // this is a dashboard-specific color palette
    "description": "",
    "metrics":
  /* This is a block for set of 3 Graphs */
    [
      /* Graph 0 */
      {
        "alias": "System Load",
        "targets": [
            {'target': 'aliasByNode(servers.dev-cmp06.system.load.load,1)',
                'color': 'rgba(255,0,0,0.2)', 'renderer': 'bar', 'alias': 'dev-cmp06'},
            {'target': 'alias(movingAverage(servers.dev-cmp06.system.load.load,5),' +
                '"Moving Average of 5 segments")', 'color': 'rgba(128,99,99,0.6)', 'alias': 'Moving Average of 5 segments',
                'renderer': 'line'}
        ],

        "events": "*",  // instead of annotator, if you use the graphite events feature
                        // you can retrieve events matching specific tag(s) -- space separated
                        // or use * for all tags. Note you cannot use both annotator and events.
                        
        "description": "",
        "interpolation": "linear",
        "renderer": 'multi',
        "colspan": 2,
        "unstack": true,
      },

      /* Graph 1 */
      {
        "alias": "Processes",

        "targets": 'servers.dev-cmp06.processes.processes.processes',

        "events": "*",  // instead of annotator, if you use the graphite events feature
                        // you can retrieve events matching specific tag(s) -- space separated
                        // or use * for all tags. Note you cannot use both annotator and events.
                        
        "description": "",
        "renderer": "area",
        "stroke": stroke,
        "unstack": true,
        "interpolation": "linear",
        "colspan": 1,
      },

      /* Graph 2 */
      {
        "alias": "Disks utilization",

        "targets": 'aliasByNode(servers.dev-cmp06.disk.diskstats.diskstats_utilization.sd*_util,5)',

        "events": "*",  // instead of annotator, if you use the graphite events feature
                        // you can retrieve events matching specific tag(s) -- space separated
                        // or use * for all tags. Note you cannot use both annotator and events.
                        
        "description": "",
        "renderer": "line",
        "unstack": true,
        "interpolation": "linear",
        "colspan": 2,
      },
    ]
  },
];


var scheme = [
              '#423d4f',
              '#4a6860', 	
              '#848f39',
              '#a2b73c',
              '#ddcb53',
              '#c5a32f',
              '#7d5836',
              '#963b20',
              '#7c2626',
              ].reverse();

function relative_period() { return (typeof period == 'undefined') ? 1 : parseInt(period / 7) + 1; }
function entire_period() { return (typeof period == 'undefined') ? 1 : period; }
function at_least_a_day() { return entire_period() >= 1440 ? entire_period() : 1440; }

function stroke(color) { return color.brighter().brighter() }
function format_pct(n) { return d3.format(",f")(n) + "%" }
