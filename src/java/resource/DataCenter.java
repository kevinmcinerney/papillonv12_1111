package resource;

import inputpackage.Call;
import connectionpackage.Connection;

import java.util.ArrayList;

import org.codehaus.groovy.grails.web.json.JSONArray;
import org.codehaus.groovy.grails.web.json.JSONException;
import org.codehaus.groovy.grails.web.json.JSONObject;

import connectionpackage.Connection;

public class DataCenter implements ResourceActivity {
	ArrayList<Floor> floors;
	int id;
	String URL;
	String name;
	String description;
	double latitude;
	double longitude;

	Connection connect = new Connection();

	public DataCenter(int id) {
		this.id = id;
		this.URL = "datacenters/" + id;
		JSONObject datacenter = connect.connect(connect, this.URL);

		try {
			this.setName(datacenter.getString("name"));
			this.setDescription(datacenter.getString("description"));
			this.setLatitude(datacenter.getDouble("latitude"));
			this.setLongitude(datacenter.getDouble("longitude"));
			this.floors = new ArrayList<Floor>();
			this.floors = getfloordata();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private ArrayList<Floor> getfloordata() {
		
		try {
			JSONArray floorsList = connect.connectMulti(connect, "datacenters/" + this.id + "/floors");

			for (int i = 0; i < floorsList.length(); i++){
				JSONObject f = floorsList.getJSONObject(i);
				floors.add(new Floor(f.getInt("id"), this.id));
			}

			return floors;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;

	}


	@Override
	public void refresh() {
		getfloordata();

	}

	public ArrayList<Floor> getFloors() {
		return floors;
	}

	public void setFloors(ArrayList<Floor> floors) {
		this.floors = floors;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

}
