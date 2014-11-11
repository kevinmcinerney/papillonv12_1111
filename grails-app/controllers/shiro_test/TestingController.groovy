package shiro_test

import resource.DataCenters
import resource.DataCenter
import resource.Floor
import resource.Rack
import resource.Host

class TestingController {
	//static scaffold = true
    def index() {

		DataCenters dcs = new DataCenters();

		String results = "";
		for(DataCenter d: dcs.getDatacenters()){
			for(Floor f: d.getFloors()){
				for(Rack rk: f.getRacks()){
					for(Host h: rk.getHosts()){
						for(Iterator<HashMap<String, HashMap<Long, Double>>> hs = h.getPower(h.getTrackerId()).keySet().iterator(); hs.hasNext();){
							String key = hs.next();
							HashMap<Long, Double> value = h.getPower(h.getTrackerId()).get(key);
							results += "key is " + key + " and value is " + value.toString() + " "
							
						}
					}
				}
			}
		}
		[test: results]
	}
}
