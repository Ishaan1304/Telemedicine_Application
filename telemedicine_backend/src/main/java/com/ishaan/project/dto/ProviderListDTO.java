package com.ishaan.project.dto;

import com.ishaan.project.entities.ProviderProfile;

public class ProviderListDTO {
	private ProviderProfile providerProfile;
	private String userPic;
	public ProviderListDTO() {
		super();
	}
	public ProviderListDTO(ProviderProfile providerProfile, String userPic) {
		super();
		this.providerProfile = providerProfile;
		this.userPic = userPic;
	}
	public ProviderProfile getProviderProfile() {
		return providerProfile;
	}
	public void setProviderProfile(ProviderProfile providerProfile) {
		this.providerProfile = providerProfile;
	}
	public String getUserPic() {
		return userPic;
	}
	public void setUserPic(String userPic) {
		this.userPic = userPic;
	}
}
