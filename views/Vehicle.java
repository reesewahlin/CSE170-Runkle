public class Vehicle
{
	int id, yr;
	String make, model;

	public Vehicle(int id, int yr, String make, String model) {
		this.id = id;
		this.yr = yr;
		this.make = make;
		this.model = model;
	}


    // public int Id { get; set; }
    public int getId() {
    	return id;
    }
    public void setId(int id) {
    	this.id = id;
    }


    // public int Year { get; set; }
    public int getYear() {
    	return yr;
    }
    public void setYear(int yr) {
    	this.yr = yr;
    }


    // public string Make { get; set; }
    public String getMake() {
    	return make;
    }
    public void setId(String make) {
    	this.make = make;
    }


    // public string Model { get; set; }
    public String getModel() {
    	return model;
    }
    public void setModel(String model) {
    	this.model = model;
    }
}